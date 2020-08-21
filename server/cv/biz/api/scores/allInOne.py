import logging

from datetime import datetime
from dateutil import relativedelta

from pyramid.security import (
    NO_PERMISSION_REQUIRED,
    Authenticated,
    remember,
    forget,
)

from sqlalchemy.ext.serializer import loads, dumps

from ...models import (
    CandidateDocumentStatus,
    VerificationAnswers,
    UserComments,
    DocumentTypes
)

from pyramid.csrf import new_csrf_token

from cornice import Service

from ....core import cors

from pyramid.view import view_config

from .core.const import BusinessConstants

import cv.biz.api.scores.pgCalc as pgCalc

# from ..schemas import (
#     PgCalc_50mNabove_Upto1891991,
# )

from .utils import util


log = logging.getLogger(__name__)

svc_allinOne = Service(
    name="biz.api.scores.allinOne", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/allinOne", cors_policy=cors.POLICY)


svc_showTable = Service(
    name="biz.api.scores.showTable", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/showTable", cors_policy=cors.POLICY)


def _key_column_generator(data):
    list = []
    for v in data:
        cand = {}
        for column, value in v.items():
            cand[column] = value
        list.append(cand)
    return list


"""This method is used get the PG with 50% marks and above

Name : showTable
Parameters :
-----------

   dt_pg_por - date of publication of results PG
   str_caste - Caste Category
   float_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""
@svc_showTable.post(require_csrf=False)
def showTable(request):
    print("++++++++++++++++++===========================")
    candidate_id = request.POST.get("candidate_id", 'No Candidate ID')
    # request.matchdict['id']

    details_query = """select oum_user_id as v_candidate_id,
        (select octm_category_code from oes_category_master where octm_category_pk::varchar=ocd_community) as str_caste,
        (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=OCD_IS_HANDICAPED) as bool_diffAbled ,
        (select  string_agg(distinct OWE_OTHER_ORGANISATION,',') from oes_work_experience where owe_user_fk=oum_user_pk) as v_subjHandled,
        coalesce((select osmsm_sub_main_desc from oes_subject_main_sub_master where osmsm_sub_main_pk::varchar=oum_subject), oum_subject) as v_subjApplied ,
        case 
            when (select  string_agg(distinct OWE_OTHER_ORGANISATION,',') from oes_work_experience where owe_user_fk=oum_user_pk) = coalesce((select osmsm_sub_main_desc from oes_subject_main_sub_master where osmsm_sub_main_pk::varchar=oum_subject), oum_subject) then '1' 
            else '2' 
        end as str_subjHandledStatus,
        oacd4.OACD_PERCENTAGE as float_pgMarks,
        oacd4.OACD_YEAR_OF_PASSING  as dt_pg_por,
        (select orvm_reference_value from oes_reference_value_master where orvm_reference_pk::varchar=oacd4.OACD_EQUIVALENT_SUB_AVAIL) ,
        oacd7.OACD_YEAR_OF_PASSING ,
        oaed_is_slet_checked ,
        oaed_is_net_checked ,
        OAED_YEAR_OF_PASSING as dt_slet_por ,
        OAED_NET_YEAR_OF_PASSING as dt_net_por,
        OAED_SLET_SUBJECT_NAME  as v_subjSlet,
        OAED_NET_SUBJECT_NAME as v_subjNet,
        OAED_DATE_VIVA 
        from oes_user_master
        left outer join oes_candidate_details on (oum_user_pk=ocd_user_fk)
        left outer join oes_acdm_cand_details oacd4 on (oum_user_pk=oacd4.oacd_user_fk and oacd4.oacd_acdm_fk=4)
        left outer join oes_acdm_cand_details oacd7 on (oum_user_pk=oacd7.oacd_user_fk and oacd7.oacd_acdm_fk=7)
        left outer join oes_additional_education_details on (oum_user_pk=oaed_user_fk)
        where oum_user_id = :candidate_id ;"""

    details_output = request.dbsession.execute(details_query, {
        "candidate_id": candidate_id
    }).fetchall()
    work_experience = _key_column_generator(details_output)
    print('_____________________________')
    print(work_experience)

    # response = orchEntry(request)
    return "Nothing"


"""This method is used get the PG with 50% marks and above

Name : allinOne
Parameters :
-----------

   dt_pg_por - date of publication of results PG
   str_caste - Caste Category
   float_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
   
"""
@svc_allinOne.post(require_csrf=False)
def allinOne(request):

    # Call All in One Function
    response = pgCalc.allinOne(request)
    return response
