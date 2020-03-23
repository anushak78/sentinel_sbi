import logging

from datetime import datetime
from dateutil import relativedelta

from pyramid.security import (
    NO_PERMISSION_REQUIRED,
    Authenticated,
    remember,
    forget,
)
from pyramid.csrf import new_csrf_token

from cornice import Service

from ....core import cors

from pyramid.view import view_config

from .core.const import BusinessConstants

import cv.biz.api.scores.pgCalc as pgCalc
import cv.biz.api.scores.mphilCalc as mphilCalc

# from ..schemas import (
#     PgCalc_50mNabove_Upto1891991,
# )

from .utils import util


log = logging.getLogger(__name__)

svc_orchEntry = Service(
    name="biz.api.scores.orchEntry", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/orchEntry", cors_policy=cors.POLICY)


"""This method is used get the PG with 50% marks and above

Name : orchEntry
Parameters :
-----------

   dt_pg_por - date of publication of results PG
   str_caste - Caste Category
   float_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""
@svc_orchEntry.post(require_csrf=False)
def orchEntry(request):

    # Call PG with 50% Marks (Dt_To : 18.09.1991)
    response_pgCalc_50mNabove_Upto1891991 = pgCalc.pgCalc_50mNabove_Upto1891991(
        request)

    # Call PG with 55% Marks & NET / SLET / CISR ( For SC / SCA / ST / Diff Abled - 50% Marks) (Dt_To : 19.09.1991 - 17.07.2018)

    response_pgCalc_55MarksforOCnGT_19091991_10072016 = pgCalc.pgCalc_55MarksforOCnGT_19091991_10072016(
        request)

    # Call PG with 55% Marks & NET / SLET / CISR ( For Other than OC- 50% Marks) (Dt_To : 18.07.2018 - 04.10.2019)

    response_pgCalc_55MarksforNonOC_11072016_04102019 = pgCalc.pgCalc_55MarksforNonOC_11072016_04102019(
        request)

    # Call Mphil Completed Before 31.12.1993 / Submitted PHD before 31/12/1993 ( From Dt :19.09.1991 - To Date : 30.07.2002)

    response_calc_mphil_bfr31121993_phd_bfr31121993 = mphilCalc.calc_mphil_bfr31121993_phd_bfr31121993(
        request)

    # Call Submitted PHD before 31.12.2002 ( From Date : 31.07.2002 - To Date : 13.06.2006)

    response_phdCalc_submtdbfr_31122002 = pgCalc.phdCalc_submtdbfr_31122002(
        request)

    # Call PG with MPHIL ( From Dt :14.06.2006 - To Date : 29.06.2010)

    response_calc_pgNmphil_bfr14062006_aftr29062010 = mphilCalc.calc_pgNmphil_bfr14062006_aftr29062010(
        request)

    # Call PG with PHD thru CR/DE/OU ( To Date : 02.04.2009)

    response_pg_phdCalc_CS_DE_OU_submtdbfr_02042009 = pgCalc.pg_phdCalc_CS_DE_OU_submtdbfr_02042009(
        request)

    # Call PG with MPHIL thru CR/DE/OU ( From Dt :14.06.2006 - To Date : 02.04.2009)

    response_calc_pgNmphil_CROUDE_bfr14062006_aftr242009 = mphilCalc.calc_pgNmphil_CROUDE_bfr14062006_aftr242009(
        request)

    # Call PG with PHD ( To Date : 04.10.2019)

    response_pg_phdCalc_CS_DE_OU_submtdbfr_04102019 = pgCalc.pg_phdCalc_CS_DE_OU_submtdbfr_04102019(
        request)

    response = response_pgCalc_50mNabove_Upto1891991, response_pgCalc_55MarksforOCnGT_19091991_10072016, response_pgCalc_55MarksforNonOC_11072016_04102019, response_calc_mphil_bfr31121993_phd_bfr31121993, response_phdCalc_submtdbfr_31122002, response_calc_pgNmphil_bfr14062006_aftr29062010, response_pg_phdCalc_CS_DE_OU_submtdbfr_02042009, response_calc_pgNmphil_CROUDE_bfr14062006_aftr242009, response_pg_phdCalc_CS_DE_OU_submtdbfr_04102019

    return response
