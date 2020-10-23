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


svc_dump_json = Service(
    name="core.api.dump_json", permission=NO_PERMISSION_REQUIRED,
    path="/ui/dump_json", cors_policy=cors.POLICY)


@svc_dump_json.get()
def dump_json(request):

    with open('cv/biz/api/scores/utils/question.json', 'r') as f:
        data = json.load(f)
        print(data)

        insert_qry = "INSERT INTO cv.docment_types_master('id','doc_type','doc_id') VALUES(73,'ABC',73)"
        data = request.dbsession.execute(
            text(insert_qry)
        )


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


def _fix_document_urls_work_experience(request, document_list, candidate_id):
    new_document_list = []
    for doc in document_list:
        doc['ocd_doc_file_name'] = request.route_url(
            'docs.view', candidate_id=candidate_id,
            file_name=doc['ocd_flag_2'] + '_' + doc['ocd_doc_file_name']
            # file_name=doc['ocd_doc_file_name']
        )
        new_document_list.append(doc)
    return new_document_list


def _fix_document_urls(request, document_list, candidate_id):
    new_document_list = []
    for doc in document_list:
        doc['ocd_doc_file_name'] = request.route_url(
            'docs.view', candidate_id=candidate_id,
            file_name=doc['ocd_flag'] + '_' + doc['ocd_doc_file_name']
            # file_name=doc['ocd_doc_file_name']
        )
        new_document_list.append(doc)
    return new_document_list


def get_candidateID(argument):
    switcher = {
        2: "'TRBAPG513827','TRBAPE929440','TRBAPE548727','TRBAPG389932','TRBAPE228416','TRBAPG337983','TRBAPG363145','TRBAPE949066','TRBAPE505939','TRBAPE804282','TRBAPE348496','TRBAPG257667', 'TRBAPE253999', 'TRBAPE520288', 'TRBAPE613393', 'TRBAPE425421', 'TRBAPE376481', 'TRBAPE548727'",
        3: "'TRBAPE247342','TRBAPE677103','TRBAPG025208','TRBAPG665299','TRBAPE459634','TRBAPE630219','TRBAPE499369','TRBAPG591904','TRBAPE907861','TRBAPE955875','TRBAPE809948','TRBAPE366474', 'TRBAPE677103', 'TRBAPE803692', 'TRBAPE278638', 'TRBAPE607187', 'TRBAPE719166', 'TRBAPE580213'",
        4: "'TRBAPE977397','TRBAPE782211','TRBAPE580213','TRBAPE378859','TRBAPE741002','TRBAPE327345','TRBAPE754567','TRBAPE278638','TRBAPE286229','TRBAPG140239','TRBAPE250147','TRBAPG895858', 'TRBAPE204494', 'TRBAPE543422', 'TRBAPE009633', 'TRBAPE181990', 'TRBAPE624559', 'TRBAPE907861'",
        5: "'TRBAPE157364','TRBAPE828027','TRBAPE455928','TRBAPE482952','TRBAPE775296','TRBAPE765883','TRBAPE805132','TRBAPE345963','TRBAPE895156','TRBAPE974778','TRBAPE119855','TRBAPE624559', 'TRBAPE885990', 'TRBAPE833396', 'TRBAPE547102', 'TRBAPE885990', 'TRBAPE833396', 'TRBAPE974778', 'TRBAPE247342', 'TRBAPE949066'",
        6: "'TRBAPE439705','TRBAPE205572','TRBAPE484570','TRBAPE890566','TRBAPE442062','TRBAPE884772','TRBAPE602731','TRBAPE607187','TRBAPE650270','TRBAPE446167','TRBAPE222706','TRBAPE478499', 'TRBAPE159838', 'TRBAPE250052', 'TRBAPE231478', 'TRBAPE250147', 'TRBAPE251862'",
        7: "'TRBAPE118081','TRBAPE421248','TRBAPE425421','TRBAPE721422','TRBAPE744622','TRBAPE898249','TRBAPE942852','TRBAPE962624', 'TRBAPE361265', 'TRBAPE482952', 'TRBAPE818747', 'TRBAPE755333', 'TRBAPE499369', 'TRBAPE955875'"
    }
    return switcher.get(argument, "nothing")


@svc_candidate_list.get()
def get_candidate_list(request):

    print("GET INTO ITHIIIIIYYYYY")
    candidate_id = request.GET.get('candidate_id', None)
    user_id = request.GET.get('user_id', None)
    status = request.GET.get('status', '')
    print("****************************************************")
    print(request.GET.get('user_id', None))
    print("****************************************************")

    # status = ''
    offset = request.GET.get('offset', 0)
    limit = request.GET.get('limit', 10)
    print("-----------------------------------------------")
    level = request.session['level']
    category = request.session['category']

    condition = {"candidate_id": candidate_id,
                 "offset": offset,
                 "limit": limit}

    pending_list_query = """
    select  DISTINCT ocd.ocd_user_fk,
    oes_candidate_details.ocd_first_name,
    oum.oum_candidate_name,
    oum.oum_user_id,
    oum.oum_user_pk,
    oum.oum_mobile_no,
    oum.oum_email_id,
    oum.oum_subject
    from oes_candidate_doc ocd
    INNER JOIN oes_user_master oum ON ocd.ocd_created_by = oum.oum_user_id
    INNER JOIN oes_candidate_details ON ocd.ocd_user_fk = oes_candidate_details.ocd_user_fk
    -- where ocd.ocd_declare_flag like 'true1'
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

    log.info(">>>>Dennis>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    log.info(user_id)
    log.info(get_candidateID(int(user_id)))
    log.info(">>>>>>>>>>Dennis>>>>>>>>>>>>>>>>>>>>>>>>>>")

    pending_list_query += " where ocd.ocd_created_by in ("
    pending_list_query += get_candidateID(int(user_id)) + ")"
    #pending_list_query += " limit 10"

    print(pending_list_query)
    count_query = """select count(*) as total_count
    from (""" + pending_list_query + """) abcd"""

    pending_list_query += " limit 10 OFFSET " + offset

#     pending_list_query += """ ORDER BY  case when  oum.oum_user_pk=42179 then 1
#                   when  oum.oum_user_pk=38588 then 2
#                   when  oum.oum_user_pk=9655 then 3
#                   when  oum.oum_user_pk=36308 then 4
#                   when  oum.oum_user_pk=29414 then 5
#                   when  oum.oum_user_pk=28917 then 6
#                   when  oum.oum_user_pk=40651 then 7
#                   when  oum.oum_user_pk=16139 then 8
#                   when  oum.oum_user_pk=32272 then 9
#                   when  oum.oum_user_pk=13641 then 10
#               else oum_user_pk
#                   end
#                               offset :offset limit :limit
#                               """
    print("***************************************************************************!@#!@#@!#!@#!@#!@!@#!@#!@#!@*")
    print(offset)
    print("*!@#!@#@!#!@#!@#!@!@#!@#!@#!@*")
    print(user_id)
    # limit = 50

    # if level == 1:
    #     if int(user_id) == 1:
    #         pending_list_query += """ offset :offset rows fetch first 50 rows only
    #                               """
    #     else:
    #         limit = limit*int(user_id)
    #         print(limit)
    #         if int(offset) == 0:
    #             offset = (limit-50)+1
    #             pending_list_query += """ offset """ + \
    #                 str(offset) + """  limit  50 """

    # else:
    #   limit_rows = limit_rows * int(user_id)
    #  if offset == 0:
    #     offset = limit_rows - 50
    # print("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    # print(offset)
    # pending_list_query += """ offset :offset rows fetch next :limit rows only
    #                       """

    # if int(offset) > 0 :
    # pending_list_query += """ offset :offset  rows fetch first 50 rows only
    #                          """
    # else :
    #    pending_list_query += """ offset :offset ROWS FETCH FIRST 50  ROWS ONLY
    #                         """

    # count_query = """select count(*) as total_count
    # from (""" + pending_list_query + """) abcd"""

    data = request.dbsession.execute(
        text(pending_list_query), condition
    )

    total_count = request.dbsession.execute(
        text(count_query), condition
    ).first()

    candidate_list = _get_candidate_state(
        request.dbsession, _key_column_generator(data), level)
    print(candidate_list)
    return {
        "code": 1,
        "message": "success",
        "data": {
            "list": clean_object(candidate_list),
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
    oci.oci_sign_image_path,
    oum.*,
    ocad.*,
    oaed.*,
    owead.*,
    oacd1.oacd_created_by,oacd1.oacd_year_of_passing as ssc_year_of_passing,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=owead.owead_relevant_work_exp) as relevant_work_experience,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oaed.oaed_pg_eduqst3) as possess_senior_diploma,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocd.ocd_is_handicaped) as is_handicapped,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocd.ocd_disability_type) as disability_type,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oaed.oaed_phd_in_tamil) as phd_in_tamil,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oaed.oaed_pstm_claim) as claimed_for_pstm,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oaed.oaed_phd_mode) as pg_mode_study,
      (select osmsm_sub_main_desc from oes_subject_main_sub_master where osmsm_sub_main_pk::varchar=oum.oum_subject) as subject_applied_for,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oaed.oaed_phd_evaluated) as phd_evaluated,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_phddegtype) as phd_degree_type,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_mphildegtype) as mphil_degree_type,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_commcertfathername) as community_issued_with_father_name,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_issueauthcommcert) as community_issued_authority,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocd.ocd_community_cert) as community_certificate_issued_by_tamil,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocd.ocd_religion_belief) as religion,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocd.ocd_isgovtservice) as is_government_service,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocd.ocd_objcertque) as noc_in_prescribed_format,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_ugeqpresc) as ug_subject_same,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_pgeqpresc) as pg_subject_same,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_pgmode) as pg_mode_of_study,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_pgforeignuni) as pg_foreign_university,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_ugmarksheet) as ug_consolidated_marksheet,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_pgmarksheet) as pg_consolidated_marksheet,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_bedmarksheet) as bed_consolidated_marksheet,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_medmarksheet) as med_consolidated_marksheet,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_lastcondcert) as last_conduct_certificate,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_latestcondcert) as latest_conduct_certificate,
      (select octm_category_desc from oes_category_master where octm_category_pk::varchar=ocd.ocd_community) as community,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd1.oacd_university) as ssc_university,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_passedslet) as passed_in_relevent_slet,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_claimexemp) as claimed_exemption,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_passedslet) as passed_slet,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oum.oum_pan_no) as claimed_slet_net_phd,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oaed.oaed_slet_agency_conducted) as agency_conducted_slet,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oaed.oaed_net_agency_conducted) as agency_conducted_net,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_passedugcnorms) as ugc_norms_net,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_orderedu) as order_of_education,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_educutoff) as education_cutoff,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=ocad.ocad_anycoursecomp) as course_completed_after_discontinuing,
      oacd1.oacd_university_other as ssc_university_other,
      oacd1.oacd_percentage as scc_percentage,
       (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd1.oacd_part_full_time) as ssc_part_full_time,
       (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd1.oacd_tamil_pass) as ssc_tamil_pass,
       oacd2.oacd_year_of_passing as hsc_year_of_passing,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd2.oacd_university) as hsc_university,
      oacd2.oacd_university_other as hsc_university_other,
      oacd2.oacd_percentage as hsc_percentage,
       (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd2.oacd_part_full_time) as hsc_part_full_time,
       (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd2.oacd_tamil_pass) as hsc_tamil_pass,
       oacd3.oacd_specialization as ug_college_name,
              oacd3.oacd_year_of_passing as ug_year_of_passing,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd3.oacd_university) as ug_university,
       (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd3.oacd_part_full_time) as ug_medium_of_instruction,
            (select osdm_sub_degree_desc from OES_SUB_DEGREE_MASTER where osdm_sub_degree_pk=oacd3.oacd_degree_subject_fk) as ug_degree_name,
      (select osmsm_sub_main_desc from OES_SUBJECT_MAIN_SUB_MASTER where osmsm_sub_main_pk::varchar=oacd3.oacd_major_subject_fk) as ug_main_subject,
             (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd3.oacd_tamil_pass) as ug_tamil_pass,
             oacd3.oacd_period_of_study_from as ug_study_from,
             oacd3.oacd_period_of_study_to as ug_study_to,
             oacd3.oacd_duration as ug_duration,
             oacd3.oacd_equivalent_sub_other as ug_equivalent_subject_other,
             (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd3.oacd_equivalent_sub_avail) as ug_equivalent_subject_available,
             (select osmsm_sub_main_desc from OES_SUBJECT_MAIN_SUB_MASTER where osmsm_sub_main_pk::varchar=oacd3.oacd_equivalent_sub) as ug_equivalent_subject,
   (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd3.oacd_recognised_university) as ug_recognised_university,
   (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd3.oacd_regular_part_distance) as ug_mode_of_study,
   (select osgm_sub_grp_desc from OES_SUBJECT_GRP_MASTER where osgm_sub_grp_pk::varchar=oacd3.oacd_subject_group) as ug_subject_group,
   oacd4.oacd_percentage as ug_percentage,
   oacd4.oacd_specialization as pg_college_name,
              oacd4.oacd_year_of_passing as pg_year_of_passing,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd4.oacd_university) as pg_university,
      oacd4.oacd_percentage as pg_percentage,
       (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd4.oacd_part_full_time) as pg_medium_of_instruction,
      (select osdm_sub_degree_desc from OES_SUB_DEGREE_MASTER where osdm_sub_degree_pk=oacd4.oacd_degree_subject_fk) as pg_degree_name,
      (select osmsm_sub_main_desc from OES_SUBJECT_MAIN_SUB_MASTER where osmsm_sub_main_pk::varchar=oacd4.oacd_major_subject_fk) as pg_main_subject,
             (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd4.oacd_tamil_pass) as pg_tamil_pass,
             oacd4.oacd_period_of_study_from as pg_study_from,
             oacd4.oacd_period_of_study_to as pg_study_to,
             oacd4.oacd_duration as pg_duration,
             oacd4.oacd_equivalent_sub_other as pg_equivalent_subject_other,
             (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd4.oacd_equivalent_sub_avail) as pg_equivalent_subject_available,
             (select osmsm_sub_main_desc from OES_SUBJECT_MAIN_SUB_MASTER where osmsm_sub_main_pk::varchar=oacd4.oacd_equivalent_sub) as pg_equivalent_subject,
   (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd4.oacd_recognised_university) as pg_recognised_university,
   (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd4.oacd_regular_part_distance) as pg_mode_of_study,
   (select osgm_sub_grp_desc from OES_SUBJECT_GRP_MASTER where osgm_sub_grp_pk::varchar=oacd4.oacd_subject_group )as pg_subject_group,
   oacd5.oacd_percentage as bed_percentage,
      oacd5.oacd_specialization as bed_college_name,
                 oacd5.oacd_year_of_passing as bed_year_of_passing,
         (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd5.oacd_university) as bed_university,
         oacd5.oacd_percentage as bed_percentage,
          (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd5.oacd_part_full_time) as bed_medium_of_instruction,
         (select osdm_sub_degree_desc from OES_SUB_DEGREE_MASTER where osdm_sub_degree_pk=oacd5.oacd_degree_subject_fk) as bed_degree_name,
         (select osmsm_sub_main_desc from OES_SUBJECT_MAIN_SUB_MASTER where osmsm_sub_main_pk::varchar=oacd5.oacd_major_subject_fk) as bed_main_subject,
                (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd5.oacd_tamil_pass) as bed_tamil_pass,
                oacd5.oacd_period_of_study_from as bed_study_from,
                oacd5.oacd_period_of_study_to as bed_study_to,
                oacd5.oacd_duration as bed_duration,
                oacd5.oacd_equivalent_sub_other as bed_equivalent_subject_other,
                             (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd5.oacd_equivalent_sub_avail) as bed_equivalent_subject_available,
                             (select osmsm_sub_main_desc from OES_SUBJECT_MAIN_SUB_MASTER where osmsm_sub_main_pk::varchar=oacd5.oacd_equivalent_sub) as bed_equivalent_subject,
                   (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd5.oacd_recognised_university) as bed_recognised_university,
                   (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd5.oacd_regular_part_distance) as bed_mode_of_study,
                   (select osgm_sub_grp_desc from OES_SUBJECT_GRP_MASTER where osgm_sub_grp_pk::varchar=oacd5.oacd_subject_group )as bed_subject_group,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd6.oacd_recognised_university) as med_recognised_university,
      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd6.oacd_regular_part_distance) as med_mode_of_study,
      (select osgm_sub_grp_desc from OES_SUBJECT_GRP_MASTER where osgm_sub_grp_pk::varchar=oacd6.oacd_subject_group )as med_subject_group,
         oacd6.oacd_percentage as med_percentage,
            oacd6.oacd_specialization as med_college_name,
                       oacd6.oacd_year_of_passing as med_year_of_passing,
               (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd6.oacd_university) as med_university,
               oacd6.oacd_percentage as med_percentage,
                (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd6.oacd_part_full_time) as med_medium_of_instruction,
               (select osdm_sub_degree_desc from OES_SUB_DEGREE_MASTER where osdm_sub_degree_pk=oacd6.oacd_degree_subject_fk) as med_degree_name,
               (select osmsm_sub_main_desc from OES_SUBJECT_MAIN_SUB_MASTER where osmsm_sub_main_pk::varchar=oacd6.oacd_major_subject_fk) as med_main_subject,
                      (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd6.oacd_tamil_pass) as med_tamil_pass,
                      oacd6.oacd_period_of_study_from as med_study_from,
                      oacd6.oacd_period_of_study_to as med_study_to,
                      oacd6.oacd_duration as med_duration,
                      oacd6.oacd_equivalent_sub_other as med_equivalent_subject_other,
                                                   (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd6.oacd_equivalent_sub_avail) as med_equivalent_subject_available,
                                                   (select osmsm_sub_main_desc from OES_SUBJECT_MAIN_SUB_MASTER where osmsm_sub_main_pk::varchar=oacd6.oacd_equivalent_sub) as med_equivalent_subject,
                                         (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd6.oacd_recognised_university) as med_recognised_university,
                                         (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd6.oacd_regular_part_distance) as med_mode_of_study,
                                         (select osgm_sub_grp_desc from OES_SUBJECT_GRP_MASTER where osgm_sub_grp_pk::varchar=oacd6.oacd_subject_group )as med_subject_group,
            (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd7.oacd_regular_part_distance) as mphill_mode_of_study,
            (select osgm_sub_grp_desc from OES_SUBJECT_GRP_MASTER where osgm_sub_grp_pk::varchar=oacd7.oacd_subject_group ) as mphill_subject_group,
   (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd7.oacd_recognised_university) as mphill_recognised_university,
            oacd7.oacd_percentage as mphill_percentage,
               oacd7.oacd_specialization as mphill_college_name,
                          oacd7.oacd_year_of_passing as mphill_year_of_passing,
                  (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd7.oacd_university) as mphill_university,
                  oacd7.oacd_percentage as med_percentage,
                   (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd7.oacd_part_full_time) as mphill_medium_of_instruction,
                  (select osdm_sub_degree_desc from OES_SUB_DEGREE_MASTER where osdm_sub_degree_pk=oacd7.oacd_degree_subject_fk) as mphill_degree_name,
                  (select osmsm_sub_main_desc from OES_SUBJECT_MAIN_SUB_MASTER where osmsm_sub_main_pk::varchar=oacd7.oacd_major_subject_fk) as mphill_main_subject,
                         (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd7.oacd_tamil_pass) as mphill_tamil_pass,
                         oacd7.oacd_period_of_study_from as mphill_study_from,
                         oacd7.oacd_period_of_study_to as mphill_study_to,
                         oacd7.oacd_duration as mphill_duration,
               (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd7.oacd_regular_part_distance) as mphill_mode_of_study,
               (select osgm_sub_grp_desc from OES_SUBJECT_GRP_MASTER where osgm_sub_grp_pk::varchar=oacd7.oacd_subject_group )as mphill_subject_group
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
    INNER JOIN oes_user_master oum
    ON oum.oum_user_id = ocd.ocd_created_by
    left join oes_acdm_cand_details  oacd1 on (oacd1.oacd_user_fk=oum_user_pk and oacd1.oacd_acdm_fk=1)
    left join oes_acdm_cand_details  oacd2 on (oacd2.oacd_user_fk=oum_user_pk and oacd2.oacd_acdm_fk=2)
    left join oes_acdm_cand_details  oacd3 on (oacd3.oacd_user_fk=oum_user_pk and oacd3.oacd_acdm_fk=3)
    left join oes_acdm_cand_details  oacd4 on (oacd4.oacd_user_fk=oum_user_pk and oacd4.oacd_acdm_fk=4)
    left join oes_acdm_cand_details  oacd5 on (oacd5.oacd_user_fk=oum_user_pk and oacd5.oacd_acdm_fk=5)
    left join oes_acdm_cand_details  oacd6 on (oacd6.oacd_user_fk=oum_user_pk and oacd6.oacd_acdm_fk=6)
    left join oes_acdm_cand_details  oacd7 on (oacd7.oacd_user_fk=oum_user_pk and oacd7.oacd_acdm_fk=7)
    left join oes_cand_additional_details ocad on oum.oum_user_pk = ocad.ocad_user_fk
    left join oes_additional_education_details oaed on oum.oum_user_pk = oaed.oaed_user_fk
    left join oes_work_exp_add_details owead on oum.oum_user_pk = owead.owead_user_fk
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
        select distinct * from (SELECT
        ocd_flag,
        ocd_doc_file_name,
        odm_name,
        cdtm.doc_id
      FROM oes_user_master
        LEFT JOIN oes_candidate_doc
          ON oum_user_id = ocd_created_by
        LEFT JOIN oes_document_master odm
          ON odm_abbreviation = ocd_flag
        INNER JOIN cv.cv_document_types_master cdtm
          ON odm_name = cdtm.doc_type
      WHERE oum_user_id = :candidate_id
      ORDER BY cdtm.doc_id ASC) d1
                              """)

    document_list = request.dbsession.execute(document_list_query, {
        "candidate_id": candidate_id
    }).fetchall()
#     document_list = []
    document_list = _key_column_generator(document_list)
    document_list = _fix_document_urls(request, document_list, candidate_id)
    print('+++++++++++document_list++++++++')
    print(document_list)
    document_list.insert(0, {
        "ocd_doc_file_name": candidate_details[0]['oci_photo_image_path'],
        "ocd_flag": "Photo",
        "odm_name": "Photo",
        "doc_id": 16
    })
    document_list.insert(1, {
        "ocd_doc_file_name": candidate_details[0]['oci_sign_image_path'],
        "ocd_flag": "Sign",
        "odm_name": "Sign",
        "doc_id": 17
    })
    document_list.insert(2, {
        "ocd_doc_file_name": candidate_details[0]['oci_sign_image_path'],
        "ocd_flag": "GI",
        "odm_name": "General Information",
        "doc_id": 10
    })
    if level > 1:
        document_list.insert(3, {
            "ocd_doc_file_name": 'null',
            "ocd_flag": "L1",
            "odm_name": "L1",
            "doc_id": 999
        })
    if candidate_details[0]['ocad_bedhearimpcertno'] != '':
        document_list.insert(len(document_list), {
            "ocd_doc_file_name": '',
            "ocd_flag": "SBC",
            "odm_name": "Special B.Ed Certificate",
            "doc_id": 141
        })
    if candidate_details[0]['ocad_seniordipcertno'] != '':
        document_list.insert(len(document_list), {
            "ocd_doc_file_name": '',
            "ocd_flag": "SDC",
            "odm_name": "Senior Diploma Certificate",
            "doc_id": 142
        })
    document_list.insert(len(document_list), {
        "ocd_doc_file_name": candidate_details[0]['oci_sign_image_path'],
        "ocd_flag": "OQ",
        "odm_name": "Order of Qualification",
        "doc_id": 140
    })
    if candidate_details[0]['oaed_is_phd_checked'] == 'true':
        document_list.insert(len(document_list), {
            "ocd_doc_file_name": '',
            "ocd_flag": "PM",
            "odm_name": "Phd Marksheet",
            "doc_id": 143
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
        select
	ocd.ocd_user_fk,
	ocd.ocd_flag as ocd_flag_2,
	'Work Experience '|| row_number() over(partition by ocd.ocd_user_fk order by ocd.ocd_user_fk) as ocd_flag,
	ocd.ocd_doc_file_name,
	owe.*
from oes_candidate_doc ocd
left join oes_work_experience owe on owe.owe_wrkexp_doc_id = ocd.ocd_wrkdoc_id
WHERE ocd.ocd_wrkdoc_id IS NOT NULL
AND length(trim(ocd.ocd_wrkdoc_id))>0 AND ocd.ocd_created_by =  :candidate_id
    """)
    work_experience = request.dbsession.execute(work_experience_query, {
        "candidate_id": candidate_id
    }).fetchall()
    work_experience = _key_column_generator(work_experience)
    work_experience = _fix_document_urls_work_experience(
        request, work_experience, candidate_id)
    print('_____________________________')
    print(work_experience)

    for d in work_experience:
        print('+++++++++++++++++++')
        print(d['ocd_doc_file_name'])
        document_list.insert(1, {
            "ocd_doc_file_name": d['ocd_doc_file_name'],
            "ocd_flag": d['ocd_flag'],
            "odm_name": d['ocd_flag'],
            "doc_id": 39
        })

    for list in document_list:
        list['status'] = {}
#         doc_id = ''
        for i in range(int(level)):
            print(list['odm_name'], list['doc_id'])
#             doc_id_query = text("""select doc_id from cv_document_types_master where doc_type==  :doc_name""")
#             doc_id = request.dbsession.execute(doc_id_query, {
#                     "doc_type": list['odm_name']
#                 }).fetchall()
#             print('$$$$$$New Doc ID $$$$$$$$$')
#             print(doc_id)
            doc_status = CandidateDocumentStatus.get_document_status(
                request.dbsession, candidate_id, list['doc_id'], (i + 1))
            print('###########doc_status########')
            print(doc_status)
            for docs in doc_status:
                print('@@@@@@@@@@@@@@@')
                print(docs['doc_id'])
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
    print(document_status)
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
        print(doc['doc_id'])
        print(doc['answers'])
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


# @svc_candidate_list.get()
# def get_candidate_list(request):
#     print("HIIIII")
#     candidate_id = request.GET.get('candidate_id', None)
#     status = request.GET.get('status', '')
#     # status = ''
#     offset = request.GET.get('offset', 0)
#     limit = request.GET.get('limit', 10)
#     level = request.session['level']
#     category = request.session['category']
#
#     condition = {"candidate_id": candidate_id,
#                  "offset": offset,
#                  "limit": limit}
#
#     pending_list_query = """
#     SELECT
#     ocd.ocd_first_name,
#     oum.oum_candidate_name,
#     oum.oum_user_id,
#     oum.oum_user_pk,
#     oum.oum_mobile_no,
#     oum.oum_email_id
#     FROM oes_payment_details opd
#     INNER JOIN oes_user_master oum ON opd.opd_user_fk = oum.oum_user_pk
#     INNER JOIN oes_candidate_details ocd ON ocd.ocd_user_fk = oum.oum_user_pk
#     WHERE opd.opd_validated_status = 'A'
#    """
#     if (candidate_id != None and candidate_id != ''):
#         pending_list_query += "AND oum.oum_candidate_name LIKE '%" + candidate_id + "%' "
#
#     if level == 2:
#         pending_list_query += """
#         and oum.oum_user_id in (select distinct (candidate_id)
#         from cv.cv_candidate_document_status
#         where status = 2 and doc_id not in (10, 9, 6, 25, 13) and level =
#         :level)"""
#         condition['level'] = str(level - 1)
#
#     if level == 3:
#         pending_list_query += """
#         and oum.oum_user_id in (select distinct (candidate_id)
#         from cv.cv_candidate_document_status
#         where status = 2 and level = :level
#         and doc_id not in (10, 9, 6, 25, 13)
#         and oum.oum_user_id in (select candidate_id from
#         cv.cv_user_comments where  (level = 2 AND status = 2) or (level =
#         3)))"""
#         condition['level'] = str(level - 1)
#
#     if (status == "A"):
#         pending_list_query += """and oum.oum_user_id in
#         (SELECT DISTINCT(candidate_id) from cv.cv_candidate_document_status
#         WHERE candidate_id NOT IN(
#         select candidate_id from cv.cv_candidate_document_status
#         where status = 2 and level = :level and doc_id not in (10, 9, 6, 25, 13)
#         group by candidate_id, level having count(*) > 0))"""
#         condition['level'] = str(level)
#
#     if (status == "R"):
#         pending_list_query += """and oum.oum_user_id in
#         (select candidate_id from cv.cv_candidate_document_status
#         where status = 2 and level = :level and doc_id not in (10, 9, 6, 25, 13) group by candidate_id)"""
#         condition['level'] = str(level)
#
#     if (status == "P"):
#         pending_list_query += """and oum.oum_user_id not in
#         (select candidate_id from cv.cv_candidate_document_status
#         where level = :level group by candidate_id)"""
#         condition['level'] = str(level)
#
#     if category == 1:
#         pending_list_query += "and ocd.ocd_agequotaradiocheck in ('1','4')"
#     elif category == 2:
#         pending_list_query += "and ocd.ocd_agequotaradiocheck = '3'"
#     elif category == 3:
#         pending_list_query += "and ocd.ocd_agequotaradiocheck = '2'"
#
#     print(pending_list_query)
#     count_query = """select count(*) as total_count
#     from (""" + pending_list_query + """) abcd"""
#
#     pending_list_query += """ ORDER BY  case when  oum.oum_user_pk=42179 then 1
#                   when  oum.oum_user_pk=38588 then 2
#                   when  oum.oum_user_pk=9655 then 3
#                   when  oum.oum_user_pk=36308 then 4
#                   when  oum.oum_user_pk=29414 then 5
#                   when  oum.oum_user_pk=28917 then 6
#                   when  oum.oum_user_pk=40651 then 7
#                   when  oum.oum_user_pk=16139 then 8
#                   when  oum.oum_user_pk=32272 then 9
#                   when  oum.oum_user_pk=13641 then 10
#               else oum_user_pk
#                   end
#                               offset :offset limit :limit
#                               """
#
#     data = request.dbsession.execute(
#         text(pending_list_query), condition
#     )
#
#     total_count = request.dbsession.execute(
#         text(count_query), condition
#     ).first()
#
#     candidate_list = _get_candidate_state(request.dbsession,
#                                           _key_column_generator(data), level)
#     return {
#         "code": 1,
#         "message": "success",
#         "data": {
#             "list": candidate_list,
#             "total_count": total_count[0]
#         }
#     }
