# Copyright (C) 2018 NSEIT Limited, Mumbai. All rights reserved.
#
# This program and the accompanying materials are made available
# under the terms described in the LICENSE file which accompanies
# this distribution. If the LICENSE file was not attached to this
# distribution or for further clarifications, please contact
# legal@nseit.com.

import logging
import json
from os import path
import csv
import os
import datetime
import time
from pyramid.security import (
    NO_PERMISSION_REQUIRED,
    Authenticated,
    remember,
    forget,
)
from pyramid.csrf import new_csrf_token
from pyramid.response import FileResponse
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest
from sqlalchemy import (
    text,
    inspect
)

from sqlalchemy.ext.serializer import loads, dumps

from cornice import Service

from ...core import cors
from ..models import (
    CandidateDocumentStatus,
    VerificationAnswers,
    UserComments,
    DocumentTypes
)

log = logging.getLogger(__name__)

svc_candidate_list = Service(
    name="core.api.candidate_list", permission=NO_PERMISSION_REQUIRED,
    path="/ui/candidate-list", cors_policy=cors.POLICY)

svc_candidate_details = Service(
    name="core.api.candidate-details", permission=NO_PERMISSION_REQUIRED,
    path="/ui/candidate/{id}", cors_policy=cors.POLICY)

svc_verify_documents = Service(
    name="core.api.verify-documents", permission=NO_PERMISSION_REQUIRED,
    path="/ui/verify-documents", cors_policy=cors.POLICY)

svc_json_string = Service(
    name="core.api.json-string", permission=NO_PERMISSION_REQUIRED,
    path="/ui/get-json-string/{id}", cors_policy=cors.POLICY)

svc_download_report = Service(
    name="core.api.download-report", permission=NO_PERMISSION_REQUIRED,
    path="/ui/download-report", cors_policy=cors.POLICY)


def _key_column_generator(data):
    list = []
    for v in data:
        cand = {}
        for column, value in v.items():
            cand[column] = value
        list.append(cand)
    return list


@view_config(route_name="docs.view", request_method="GET")
def doc_view(request):
    candidate_id = request.matchdict.get('candidate_id', None)
    file_name = request.matchdict.get('file_name', None)
    if candidate_id is None or file_name is None:
        raise HTTPBadRequest('Bad Parameters 1')
    doc_dir = request.registry.settings['cv.doc_dir']
    file_path = path.join(doc_dir, candidate_id, file_name)
    log.info('serving file %s', file_path)
    if not path.exists(file_path):
        raise HTTPBadRequest('Bad Parameters 2')
    response = FileResponse(file_path, request=request)
    return response


@view_config(route_name="docs.report", request_method="GET")
def doc_report(request):
    file_name = request.matchdict.get('file_name', None)
    doc_dir = request.registry.settings['cv.report_dir']
    file_path = path.join(doc_dir, file_name)
    log.info('serving report file %s', file_path)
    if not path.exists(file_path):
        raise HTTPBadRequest('Bad Parameters 2')
    response = FileResponse(file_path, request=request)
    return response


def clean_object(data):
    return json.loads(json.dumps(data, indent=4, sort_keys=True, default=str))


def serialize(self):
    return {c: getattr(self, c) for c in inspect(self).attrs.keys()}


def _fix_document_urls(request, document_list, candidate_id):
    new_document_list = []
    for doc in document_list:
        doc['ocd_doc_file_name'] = request.route_url(
            'docs.view', candidate_id=candidate_id,
            # file_name=doc['ocd_flag'] + '_' + doc['ocd_doc_file_name']
            file_name=doc['ocd_doc_file_name']
        )
        new_document_list.append(doc)
    return new_document_list


@svc_candidate_list.get()
def get_candidate_list(request):
    print("HIIIII")
    candidate_id = request.GET.get('candidate_id', None)
    status = request.GET.get('status', '')
    # status = ''
    offset = request.GET.get('offset', 0)
    limit = request.GET.get('limit', 10)
    level = request.session['level']
    category = request.session['category']

    condition = {"candidate_id": candidate_id,
                 "offset": offset,
                 "limit": limit}

    pending_list_query = """
    SELECT
    ocd.ocd_first_name,
    oum.oum_candidate_name,
    oum.oum_user_id,
    oum.oum_user_pk,
    oum.oum_mobile_no,
    oum.oum_email_id
    FROM oes_payment_details opd
    INNER JOIN oes_user_master oum ON opd.opd_user_fk = oum.oum_user_pk
    INNER JOIN oes_candidate_details ocd ON ocd.ocd_user_fk = oum.oum_user_pk
    WHERE opd.opd_validated_status = 'A'
   """
    if (candidate_id != None and candidate_id != ''):
        pending_list_query += "AND oum.oum_candidate_name LIKE '%" + candidate_id + "%' "

    if level == 2:
        pending_list_query += """
        and oum.oum_user_id in (select distinct (candidate_id)
        from cv.cv_candidate_document_status
        where status = 2 and doc_id not in (10, 9, 6, 25, 13) and level =
        :level)"""
        condition['level'] = str(level - 1)

    if level == 3:
        pending_list_query += """
        and oum.oum_user_id in (select distinct (candidate_id)
        from cv.cv_candidate_document_status
        where status = 2 and level = :level
        and doc_id not in (10, 9, 6, 25, 13)
        and oum.oum_user_id in (select candidate_id from
        cv.cv_user_comments where  (level = 2 AND status = 2) or (level =
        3)))"""
        condition['level'] = str(level - 1)

    if (status == "A"):
        pending_list_query += """and oum.oum_user_id in
        (SELECT DISTINCT(candidate_id) from cv.cv_candidate_document_status
        WHERE candidate_id NOT IN(
        select candidate_id from cv.cv_candidate_document_status
        where status = 2 and level = :level and doc_id not in (10, 9, 6, 25, 13)
        group by candidate_id, level having count(*) > 0))"""
        condition['level'] = str(level)

    if (status == "R"):
        pending_list_query += """and oum.oum_user_id in 
        (select candidate_id from cv.cv_candidate_document_status
        where status = 2 and level = :level and doc_id not in (10, 9, 6, 25, 13) group by candidate_id)"""
        condition['level'] = str(level)

    if (status == "P"):
        pending_list_query += """and oum.oum_user_id not in 
        (select candidate_id from cv.cv_candidate_document_status
        where level = :level group by candidate_id)"""
        condition['level'] = str(level)

    if category == 1:
        pending_list_query += "and ocd.ocd_agequotaradiocheck in ('1','4')"
    elif category == 2:
        pending_list_query += "and ocd.ocd_agequotaradiocheck = '3'"
    elif category == 3:
        pending_list_query += "and ocd.ocd_agequotaradiocheck = '2'"

    print(pending_list_query)
    count_query = """select count(*) as total_count
    from (""" + pending_list_query + """) abcd"""

    pending_list_query += """ ORDER BY oum.oum_user_pk
                              offset :offset limit :limit
                              """

    data = request.dbsession.execute(
        text(pending_list_query), condition
    )

    total_count = request.dbsession.execute(
        text(count_query), condition
    ).first()

    candidate_list = _get_candidate_state(request.dbsession,
                                          _key_column_generator(data), level)
    return {
        "code": 1,
        "message": "success",
        "data": {
            "list": candidate_list,
            "total_count": total_count[0]
        }
    }


def _get_candidate_state(dbsession, candidate_list, level):
    for candidate in candidate_list:
        status_query = """
        SELECT DISTINCT (status), level
        FROM cv.cv_candidate_document_status
        WHERE candidate_id = :candidate_id and level <= :level
        and doc_id not in (10, 9, 6, 25, 13)
        GROUP BY status,
        level
        ORDER BY level desc, status desc
        LIMIT 1"""
        candidate_status = dbsession.execute(text(status_query), {
            'candidate_id': candidate['oum_user_id'],
            'level': level
        })
        cs = _key_column_generator(candidate_status)
        candidate['status'] = 0
        for stats in cs:
            if level <= stats['level']:
                if stats['status'] == 2:
                    candidate['status'] = 2
                    break
                else:
                    candidate['status'] = 1
            else:
                candidate['status'] = 0
        if level > 1:
            candidate['status'] = UserComments.get_status(
                dbsession, candidate['oum_user_id'], level)
    return candidate_list


def _get_additional_document(request, candidate_id):
    additional_document_query = """
    SELECT ocad_qual_be_extc \"BEEXTC\",ocad_qual_bsc_bca_cs_bscit \"BCABSC\",
    ocad_qual_be_btech_cs_it \"BEBTCOMSC\",ocad_qual_pg_comp_app \"PGCOMAP\",
    ocad_qual_me_mtech_comm_sys \"MEMTCOMSY\", ocad_qual_me_mtech_cs_it
    \"MEMTCOMSC\",
    ocad_qual_mca \"MCA\" FROM
    oes_candidate_quota_details ocqd
    INNER JOIN oes_user_master oum on ocqd.ocad_user_fk = oum.oum_user_pk
    WHERE
    ocqd.ocad_extra_qualification = 'Yes'
    and oum.oum_user_id = :candidate_id ;
    """
    data = request.dbsession.execute(text(additional_document_query), {
        "candidate_id": candidate_id
    }).fetchall()

    docs = _key_column_generator(data)
    document_list = []
    if len(docs) > 0:
        for key, value in docs[0].items():
            print(key)
            if value == 'true':
                document_list.append(_get_add_doc_by_candidate(request,
                                                               candidate_id,
                                                               key))
    return document_list


def _get_add_doc_by_candidate(request, candidate_id, key):
    get_document_query = """
    SELECT ocd_doc_file_name, ocd_flag
    FROM oes_candidate_doc
    WHERE
    ocd_flag = :flag
    and ocd_created_by = :candidate_id;
    """
    data = request.dbsession.execute(text(get_document_query), {
        "candidate_id": candidate_id,
        "flag": key
    }).fetchall()
    docs = _key_column_generator(data)
    print("============DOCS===========")
    print(docs)
    fixed = _fix_document_urls(request, docs, candidate_id)
    return fixed[0]


@svc_candidate_details.get()
def get_candidate_details(request):
    print("++++++++++++++++++===========================")
    candidate_id = request.matchdict['id']
    level = request.session['level']

    details_query = text("""
    select
    ocd.*,
    o.osm_state_code,
    o.osm_state_name,
    ocm.octm_category_desc,
    orvm.orvm_reference_value,
    osm.osm_status_desc,
    oci.oci_photo_image_path,
    oci.oci_sign_image_path
    from oes_candidate_details ocd
    inner join oes_state_master o
    on ocd.ocd_comm_state_fk = o.osm_state_pk
    inner join oes_category_master ocm
    on ocd.ocd_category_fk = ocm.octm_category_pk
    inner join oes_reference_value_master orvm
    on ocd.ocd_gender_fk = orvm.orvm_reference_pk
    inner join oes_status_master osm
    on ocd.ocd_status_id_fk = osm.osm_status_pk
    INNER JOIN oes_candidate_images oci
    ON ocd.ocd_user_fk = oci.oci_user_fk
    where ocd.ocd_created_by = :candidate_id
                          """)
    data = request.dbsession.execute(details_query, {
        "candidate_id": candidate_id
    }).fetchall()
    candidate_details = _key_column_generator(data)
    candidate_details[0]['oci_photo_image_path'] = request.route_url(
        'docs.view', candidate_id=candidate_id,
        file_name=candidate_id + "_photo.jpg"
    )
    candidate_details[0]['oci_sign_image_path'] = request.route_url(
        'docs.view', candidate_id=candidate_id,
        file_name=candidate_id + "_sign.jpg"
    )

    document_list_query = text("""
        select distinct * from ( select
        ocd_flag,
        ocd_doc_file_name,
        CASE
        WHEN
        odm_name = 'NOC (For Department)' AND
        owe_police_dept = 'Other'
        THEN 'Noc (Other Department)'
        WHEN
        odm_name = 'NOC (For Department)' AND
        owe_police_dept = 'Police'
        THEN 'Noc (Police Department)'
        ELSE
        odm_name
        END odm_name
        from oes_user_master
        left join oes_candidate_doc
        on oum_user_id = ocd_created_by
        left join (
  SELECT
    CASE
    WHEN
      odm_name = 'NOC (For Department)' AND
      owe_police_dept = 'Other'
      THEN 'Noc (Other Department)'
    WHEN
      odm_name = 'NOC (For Department)' AND
      owe_police_dept = 'Police'
      THEN 'Noc (Police Department)'
    ELSE
      odm_name
    END odm_name,
    odm_abbreviation
  FROM oes_user_master
    LEFT JOIN oes_candidate_doc
      ON oum_user_id = ocd_created_by
    LEFT JOIN oes_document_master
      ON odm_abbreviation = ocd_flag
    LEFT JOIN tnu.oes_work_experience owe
      ON oum_user_id = owe.owe_created_by
  WHERE odm_name IS NOT NULL AND oes_document_master.odm_status != 'D'
    and oum_user_id = :candidate_id
  GROUP BY odm_name, odm_abbreviation, owe_police_dept) odm
        on odm_abbreviation = ocd_flag
        inner join cv.cv_document_types_master cdtm
        on odm_name = cdtm.doc_type
        LEFT JOIN tnu.oes_work_experience owe
        ON oum_user_id = owe.owe_created_by
        where oum_user_id = :candidate_id
        order by cdtm.doc_id asc) d1
                              """)

    document_list = request.dbsession.execute(document_list_query, {
        "candidate_id": candidate_id
    }).fetchall()
    document_list = _key_column_generator(document_list)
    document_list = _fix_document_urls(request, document_list, candidate_id)
    document_list.insert(0, {
        "ocd_doc_file_name": candidate_details[0]['oci_photo_image_path'],
        "ocd_flag": "Photo",
        "odm_name": "Photo"
    })
    document_list.insert(1, {
        "ocd_doc_file_name": candidate_details[0]['oci_sign_image_path'],
        "ocd_flag": "Sign",
        "odm_name": "Sign"
    })
    document_list.insert(2, {
        "ocd_doc_file_name": candidate_details[0]['oci_sign_image_path'],
        "ocd_flag": "GI",
        "odm_name": "General Information"
    })

    # additional_documents = _get_additional_document(request, candidate_id)
    # if len(additional_documents) > 0:
    #     document_list.insert(15, {
    #         "ocd_doc_file_name": additional_documents[0]['ocd_doc_file_name'],
    #         "document_list": additional_documents,
    #         "ocd_flag": "Additional Mark",
    #         "odm_name": "Additional Mark"
    #     })
    work_experience_query = text("""
        select * from oes_work_experience where owe_created_by =  :candidate_id
    """)
    work_experience = request.dbsession.execute(work_experience_query, {
        "candidate_id": candidate_id
    }).fetchall()
    work_experience = _key_column_generator(work_experience)
    print(work_experience)

    for list in document_list:
        list['status'] = {}
        for i in range(int(level)):
            print("++++++++++++++++")
            print(list['odm_name'])
            doc_status = CandidateDocumentStatus.get_document_status(
                request.dbsession, candidate_id, list['odm_name'], (i + 1))
            for docs in doc_status:
                answers = VerificationAnswers.get_verification_answers(
                    request.dbsession, candidate_id, docs['doc_id'], (i + 1))
                docs['answers'] = answers

            list['status']['level' + str(i + 1)] = doc_status
    comments = UserComments.get_comment(request.dbsession, candidate_id, level)
    return {
        "code": 1,
        "message": "success",
        "data": {
            "candidate_details": clean_object(candidate_details),
            "document_list": clean_object(document_list),
            "comments": comments,
            "work_experience": clean_object(work_experience)
        }
    }


@svc_verify_documents.post(require_csrf=False)
def verify_documents(request):
    candidate_id = request.params['candidate_id']
    document_status = json.loads(request.params['document_status'])
    level = request.session['level']
    user_id = request.session['user_id']
    comment = ""
    if 'comments' in request.params:
        comment = request.params['comments']

    dbsession = request.dbsession
    check = dbsession.query(
        CandidateDocumentStatus).filter(
        CandidateDocumentStatus.level == level).filter(
        CandidateDocumentStatus.candidate_id == candidate_id).all()
    if (len(check) != 0):
        return {
            "code": 0,
            "message": "already exist",
            "data": {}
        }
    for doc in document_status:
        doc_id = doc['doc_id']
        status = doc['status']
        _insert_answers(
            dbsession, doc["answers"], candidate_id,
            level, doc_id, user_id)
        create_doc_status = CandidateDocumentStatus(
            candidate_id=candidate_id, level=level, doc_id=doc_id,
            status=status, user_id=user_id)
        dbsession.add(create_doc_status)
    if level > 1:
        candidate_status = request.params['candidate_status']
        add_comment = UserComments(candidate_id, level, comment,
                                   candidate_status)
        dbsession.add(add_comment)

    return {
        "code": 1,
        "message": "success",
        "data": {}
    }


def _insert_answers(dbsession, answers, candidate_id, level, doc_id,
                    user_id):
    for answer in answers:
        create_verification = VerificationAnswers(
            candidate_id=candidate_id, level=level, doc_id=doc_id,
            qn_id=answer["qn_id"], ans_id=answer["ans_id"], user_id=user_id,
            additional_info=answer["additional_info"] if 'additional_info'
                                                         in answer else '')
        dbsession.add(create_verification)


@svc_json_string.get()
def get_json_string(request):
    candidate_id = request.matchdict['id']
    query = """
    SELECT * FROM oes_candidate_pdf_json
    WHERE ocpj_created_by = :candidate_id"""
    data = request.dbsession.execute(query, {
        "candidate_id": candidate_id
    }).fetchall()
    json_data = _key_column_generator(data)
    if len(json_data) > 0:
        return {
            "code": 1,
            "message": "success",
            "data": {
                "json": clean_object(json_data[0])
            }
        }
    else:
        return {
            "code": 0,
            "message": "no pdf doc found",
            "data": {}
        }


@svc_download_report.get()
def download_report(request):
    level = request.session['level']
    date_time = time.time()
    master = os.path.abspath(
        os.path.join(__file__,
                     "../../../../uploads/" + str(date_time) + '.csv'))
    candidate_ids = CandidateDocumentStatus.get_distinct_candidate(
        request.dbsession, level)

    with open(master, 'w') as csvfile:
        all_documents = DocumentTypes.get_all_documents(request.dbsession)

        # Headers
        fieldnames = ['user_id', 'first_name', 'last_name', 'level 1 status',
                      'level 1 scrutiny date', 'level 2 status',
                      'level 2 scrutiny date', 'level 2 comment',
                      'level 3 status',
                      'level 3 scrutiny date', 'level 3 comment']
        # Headers for all three levels
        count = 1
        while (count < int(level + 1)):
            for doc in all_documents:
                print(doc['doc_type'])
                fieldnames.append(doc['doc_type'] + ' - level ' + str(count))
            count = count + 1
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        # Data
        for user_id in candidate_ids:
            candidate_level_status = UserComments.get_candidate_status_of_all_level(
                request.dbsession, user_id)

            candidate_details = _execute_raw_query(request.dbsession, user_id)
            document_status = CandidateDocumentStatus.get_document_status_of_all_levels(
                request.dbsession, user_id)

            if candidate_details != '':
                a = {
                    'user_id': candidate_details[0]['ocd_created_by'],
                    'first_name': candidate_details[0]['ocd_first_name'],
                    'last_name': candidate_details[0]['ocd_last_name']
                }

            for candidate_status in candidate_level_status:
                if (level >= candidate_status['level']):
                    a['level ' + str(
                        candidate_status['level']) + ' status'] = 'Rejected' if \
                        candidate_status['status'] == 2 else 'Approved'

                    a['level ' + str(
                        candidate_status['level']) + ' comment'] = \
                        candidate_status['comment']

            ignore_docs = [10, 9, 6, 25, 13]
            flag = 1
            status_text = ''
            for doc_all_status in document_status:
                if (doc_all_status['level'] == 1 and level >= doc_all_status[
                    'level']):
                    if (doc_all_status['status'] == 2):
                        if doc_all_status['doc_id'] not in ignore_docs:
                            flag = 2
                    status_text = 'Not Matching/Not Clear' if doc_all_status[
                                                                  'status'] == 2 else 'Matching'
                    a['level 1 scrutiny date'] = datetime.datetime.strptime(
                        str(doc_all_status['created_at'])[:19],
                        '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d')
                elif (doc_all_status['level'] == 2 and level >= doc_all_status[
                    'level']):
                    status_text = 'Not Matching/Not Clear' if doc_all_status[
                                                                  'status'] == 2 else 'Matching'
                    a['level 2 scrutiny date'] = datetime.datetime.strptime(
                        str(doc_all_status['created_at'])[:19],
                        '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d')
                elif (doc_all_status['level'] == 3 and level >= doc_all_status[
                    'level']):
                    status_text = 'Rejected' if doc_all_status[
                                                    'status'] == 2 else 'Approved'
                    a['level 3 scrutiny date'] = datetime.datetime.strptime(
                        str(doc_all_status['created_at'])[:19],
                        '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d')
                a[
                    'level 1 status'] = 'Not Matching/Not Clear' if flag == 2 else 'Matching'

                if (level >= doc_all_status['level']):
                    a[doc_all_status['doc_type'] + ' - level ' + str(
                        doc_all_status['level'])] = status_text
            writer.writerow(a)

    return {
        "code": 1,
        "message": "success",
        "data": {
            'file_path': request.route_url(
                'docs.report',
                file_name=str(date_time) + '.csv'
            )
        }
    }


def _execute_raw_query(dbsession, candidate_id):
    query = """SELECT ocd_first_name,ocd_middle_name,ocd_last_name,ocd_created_by FROM oes_candidate_details WHERE ocd_created_by = :candidate_id"""
    data = dbsession.execute(
        query, {
            "candidate_id": candidate_id
        }).fetchall()
    data = _key_column_generator(data)
    if len(data) > 0:
        return data
    else:
        return ''

# Local Variables:
# mode: python
# End:
