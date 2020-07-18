import logging

from datetime import datetime
from dateutil import relativedelta
from datetimerange import DateTimeRange

from pyramid.security import (
    NO_PERMISSION_REQUIRED,
    Authenticated,
    remember,
    forget,
)
from pyramid.csrf import new_csrf_token

from cornice import Service

from ....core import cors

import json

from pyramid.view import view_config

from .core.const import BusinessConstants
from ..schemas import (
    PgCalc_50mNabove_Upto1891991,
)
from .utils import util


log = logging.getLogger(__name__)

# svc_pgCalc_50mNabove_Upto1891991 = Service(
#     name="biz.api.scores.pgCalc_50mNabove_Upto1891991", permission=NO_PERMISSION_REQUIRED,
#     path="/biz/scores/pgCalc_50mNabove_Upto1891991", cors_policy=cors.POLICY)

svc_pgCalc_55MarksforOCnGT_19091991_10072016 = Service(
    name="biz.api.scores.pgCalc_55MarksforOCnGT_19091991_10072016", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/pgCalc_55MarksforOCnGT_19091991_10072016", cors_policy=cors.POLICY)

svc_pgCalc_55MarksforNonOC_11072016_04102019 = Service(
    name="biz.api.scores.pgCalc_55MarksforNonOC_11072016_04102019", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/pgCalc_55MarksforNonOC_11072016_04102019", cors_policy=cors.POLICY)

svc_phdCalc_submtdbfr_31122002 = Service(
    name="biz.api.scores.phdCalc_submtdbfr_31122002", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/phdCalc_submtdbfr_31122002", cors_policy=cors.POLICY)

svc_pg_phdCalc_CS_DE_OU_submtdbfr_02042009 = Service(
    name="biz.api.scores.pg_phdCalc_CS_DE_OU_submtdbfr_02042009", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/pg_phdCalc_CS_DE_OU_submtdbfr_02042009", cors_policy=cors.POLICY)

svc_pg_phdCalc_CS_DE_OU_submtdbfr_04102019 = Service(
    name="biz.api.scores.pg_phdCalc_CS_DE_OU_submtdbfr_04102019", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/pg_phdCalc_CS_DE_OU_submtdbfr_04102019", cors_policy=cors.POLICY)


"""
This method is to check for SLET / NET Check

Name : pg_sletNnet
PARAMETERS :
-----------

sletNbool_netStatus - Slet or Net Toggle Status
v_subHandled - Subject handled during Course
v_subjSlet - Subject applied for SLET
v_subjNet - Subject applied for NET
fnName - Function Name for Logging

"""


def pg_sletNnet(bool_sletStatus, bool_netStatus, v_subjSlet, v_subjNet, v_subjHandled, bool_equivFlag1, bool_equivFlag2, fnName):
    log.info("%s- SLET STATUS", bool_sletStatus)
    log.info("%s - NET STATUS", bool_netStatus)
    if (bool_netStatus):
        log.info("%s- Step 4.2.1 - NET STATUS MATCHES", fnName)

        if(str(v_subjHandled) == str(v_subjNet)):
            log.info(
                "%s - Step 4.2.2 - Net Subject & Subject Handled Matches ", fnName)
            log.info("%s - Step 4.2.3 - Consider This Date", fnName)
            return True
        else:
            log.info(
                "%s - Step 4.2.4 - Net Subject & Subject Handled does not match", fnName)
            log.info("%s - Step 4.2.5 - Dont Consider this Date", fnName)
            return False

    elif (bool_sletStatus):
        log.info("%s - Step 4.2.1 - SLET Status matches", fnName)

        if(str(v_subjHandled) == str(v_subjSlet)):
            log.info(
                "%s - Step 4.2.2 - Slet Subject & Subject Handled Matches ", fnName)
            log.info("%s - Step 4.2.3 - Consider This Date", fnName)
            return True
        else:

            if(bool_equivFlag1 or bool_equivFlag2):
                log.info(
                    "%s - Step 4.2.3 - Equivalence Flag1 or Flag2 Matched  ", fnName)
                log.info("%s - Step 4.2.4 - Consider This Date", fnName)
                return True
            else:
                log.info(
                    "%s - Step 4.2.4 - Slet Subject & Subject Handled does not match", fnName)
                log.info("%s - Step 4.2.5 - Dont Consider this Date", fnName)
                return False

    else:
        log.info("%s - Step 4.2.6 - SLET NET Condition Failure ", fnName)
        log.info("%s - Step 4.2.7 - Dont Consider this date", fnName)
        return False


"""
This method is to check for isolate and modulate the differently abled Check
with SC variant of 50% marks consideration


Name : pg_diffAbCheck
PARAMETERS :
-----------

bool_diffAbled - Differently abled flag
float_pgMarks - PG Marks percentile
str_caste - Caste category
fnName - Function Name for Logging
"""


def pg_diffAbCheck(bool_diffAbled, float_pgMarks, str_caste, cutOffConsidered, fnName):
    print(bool_diffAbled)
    print(float_pgMarks)
    if bool_diffAbled:
        log.info("%s - Step 3 - Candidate in Differently Abled Category", fnName)
        print(float(float_pgMarks))

        if(float(float_pgMarks) >= float(BusinessConstants.MARKS_50_PER)):
            log.info("Step 3.1 - >= 50% Marks Pass")
            log.info("Step 3.2 - Consider this Date")
            return True

        else:
            log.info("%s - Step 3.3 - 50% Marks Failed", fnName)
            log.info("%s -Step 3.4 -  Dont Consider This Date", fnName)
            return False
    else:
        log.info("%s - Step 4 - Candidate Fit & Abled", fnName)

        if(float(float_pgMarks) >= cutOffConsidered):
            log.info("%s - Step 4.1 - >=  %s Marks Pass",
                     fnName, cutOffConsidered)
            log.info("%s - Step 4.2 -  Consider this Date", fnName)
            return True
        else:
            log.info("%s - Step 4.4 - %s Marks Failed ",
                     fnName, cutOffConsidered)
            log.info("%s - Step 4.5 -  Dont Consider This Date", fnName)
            return False


"""
This method is to check for Subject Check if Subject Handled and Subject Applied
are the same

Name : pg_subjCheck
PARAMETERS :
-----------

str_subjHandledStatus - Subject handled Status
v_subHandled - Subject handled during Course
v_subjApplied - Subject applied for Post
fnName - Function Name for Logging
bool_equivFlag1 - equivalence flag for Checking Equivalence Subject
v_equiv1Sub - Subject for Equivalence  1
"""


def pg_subjCheck(str_subjHandledStatus, v_subjHandled, v_subjApplied, bool_equivFlag1, v_equiv1Sub, fnName):

    if (int(str_subjHandledStatus) == BusinessConstants.MATCHED):
        log.info("%s - Step 4.2.1 - Subject Handled Status MATCHED", fnName)

        if(str(v_subjHandled) == str(v_subjApplied)):
            log.info(
                "%s - Step 4.2.2 - Subject Handled Matches Subject Applied ", fnName)
            log.info("%s - Step 4.2.3 - Consider This Date", fnName)
            return True
        else:
            if (bool_equivFlag1 == True):
                if(str(v_equiv1Sub) == str(v_subjApplied)):
                    log.info(
                        "%s - Step 4.2.2 - Subject Handled Matches Subject Applied ", fnName)
                    log.info("%s - Step 4.2.3 - Consider This Date", fnName)
                    return True
                else:
                    log.info(
                        "%s - Step 4.2.4 - Equivalence Subj And Sub Applied Check does not match", fnName)
                    log.info("%s - Step 4.2.5 - Dont Consider this Date", fnName)
                    return False
            else:
                log.info(
                    "%s - Step 4.2.4 - Subject Handled & Subject Applied Dont Match ", fnName)
                log.info("%s - Step 4.2.5 - Dont Consider this Date", fnName)
                return False
    else:
        log.info("%s - Step 4.2.6 - Subject Handled status NOT MATCHED", fnName)
        log.info("%s - Step 4.2.7 - Dont Consider this date", fnName)
        return False


"""
Function to convert True or False to Bool
"""


def str2bool(v):
    return v.lower() in ("yes", "True", "true", 't', "1")


"""This method is used get the PG with 50% marks and above

Name : pgCalc_50mNabove_Upto1891991
Parameters :
-----------

   dt_por - date of publication of results
   str_caste - Caste Category
   float_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""
# @svc_pgCalc_50mNabove_Upto1891991.post(require_csrf=False)


def pgCalc_50mNabove_Upto1891991(request):
    response = " What To do"
    log.info("Step 0 - Inside pgCalc_50mNabove_Upto1891991")

    # Sample code to validate the json data
    # errors = util.validate(request.POST, PgCalc_50mNabove_Upto1891991())
    # if len(errors) > 0:
    #     return errors
    toConsider = False  # Toggle Flag to calculate the Date Difference

    # TODO Move this to a config file or DB
    DT_POR_CUTOFF = datetime(1991, 9, 18).date()

    # Get the pg Marks from Request
    float_pgMarks = request.POST.get("float_pgMarks", 'No PG Marks Recieved')

    # Get the values from the request object
    dt_pg_por = datetime.strptime(request.POST.get(
        "dt_pg_por", 'No POR Date Recieved'), '%d/%m/%Y').date()

    dt_elp_fromDt = datetime.strptime(request.POST.get(
        "dt_elp_fromDt", 'From Date - Period Of Service'), '%d/%m/%Y').date()

    dt_elp_toDt = datetime.strptime(request.POST.get(
        "dt_elp_toDt", 'To Date - Period Of Service'), '%d/%m/%Y').date()

    str_subjHandledStatus = request.POST.get(
        "str_subjHandledStatus", "No Subject Handled  Status Info Recieved")

    v_subjHandled = request.POST.get(
        "v_subjHandled", "No Subject Handled Applied Info Recieved")  # Name of Subject Handled from DB.

    v_subjectApplied = request.POST.get(
        "v_subjApplied", "No Subject Applied Info Recieved")  # Name of Post Applied  from DB.

    META_DATA = {'POR Cut Off Date': str(DT_POR_CUTOFF),
                 'PG MARKS': float_pgMarks,
                 'PG POR Date ': str(dt_pg_por),
                 'From Date - Period Of Service ': str(dt_elp_fromDt),
                 'To Date - Period Of Service': str(dt_elp_toDt),
                 'Subject Handled Status ': str_subjHandledStatus,
                 'Subject Handled ': v_subjHandled,
                 'Subject Applied ': v_subjectApplied
                 }

    if(BusinessConstants.MARKS_50_PER <= float(float_pgMarks) <= BusinessConstants.MARKS_55_PER):

        log.info("Step1 : Check 1 Pass : pgMarks > 50% < 55% ")

        # Entry Check Point if POR < CUT OFF DATE
        if dt_pg_por <= DT_POR_CUTOFF:
            log.info("Step 1 - POR Date within CutOff Date")

            toConsider = pg_subjCheck(str_subjHandledStatus,
                                      v_subjHandled, v_subjectApplied, False, 'NONE', pgCalc_50mNabove_Upto1891991)

            log.info(toConsider)

            if(toConsider == True):

                # Eligibility Period Cut Off Check
                if(dt_elp_toDt > DT_POR_CUTOFF):
                    dt_top_date = dt_elp_toDt
                else:
                    dt_top_date = DT_POR_CUTOFF

                main_diff = relativedelta.relativedelta(
                    dt_top_date, dt_elp_fromDt)

                master_time_range = DateTimeRange(dt_elp_fromDt, dt_top_date)

                dt_omit_dt_range_list = request.POST.get(
                    "dt_omit_ranges", "No List Present")

                res = json.loads(dt_omit_dt_range_list)
                dt_range_end_list = [0, 0]
                sub_diff = relativedelta.relativedelta(
                    years=0, months=0, days=0, hours=0, minutes=0, seconds=0, microseconds=0)

                dt_omit_dt_range_list_to_consider = []

                for r in res:
                    dt_start_date = datetime.strptime(
                        r["dateRange"]["dt_range_start"], '%d/%m/%Y').date()
                    dt_end_date = datetime.strptime(
                        r["dateRange"]["dt_range_end"], '%d/%m/%Y').date()
                    sub_range = DateTimeRange(dt_start_date, dt_end_date)
                    print(sub_range)

                    if(sub_range in master_time_range):
                        sub_diff = sub_diff + relativedelta.relativedelta(
                            dt_end_date, dt_start_date)
                        dt_range_str = "Start Date : " + \
                            str(dt_start_date), "End Date : "+str(dt_end_date)
                        dt_omit_dt_range_list_to_consider.append(dt_range_str)

                diff = main_diff - sub_diff

                dt_diff_response = str(str(diff.years) + " Years and " + str(diff.months) +
                                       " Months and " + str(diff.days) + " Days")

                dt_diff_original_response = str(str(main_diff.years) + " Years and " + str(main_diff.months) +
                                                " Months and " + str(main_diff.days) + " Days")

                dt_diff_omitted_response = str(str(sub_diff.years) + " Years and " + str(sub_diff.months) +
                                               " Months and " + str(sub_diff.days) + " Days")

                response = {'Title':  'PG with 50% Marks',
                            'Status': 'PASS',
                            'Eligible From Date': str(dt_elp_fromDt),
                            'Eligible To Date': str(dt_top_date),
                            'Dates Ranges To Omit': dt_omit_dt_range_list_to_consider,
                            'Date Difference Original ': dt_diff_original_response,
                            'Date Difference Omitted': dt_diff_omitted_response,
                            'Date Difference To Consider': dt_diff_response,
                            'Subject Handled': v_subjHandled,
                            'From Date': '',
                            'To Date': '18.09.1991',
                            'META-DATA': META_DATA
                            }

                # response = response_json

            else:
                log.info("Step 4.2.6: Subject Checks Failed")
                response = {'Title':  'PG with 50% Marks',
                            'From Date': '18.09.1991',
                            'To Date': '18.09.1991',
                            'Status': 'FAIL',
                            'Reason': 'Subject Handled & Subject Applied Check FAILED'
                            }
        else:
            log.info("Step 4.2.7: PG POR Date Not under 18.09.1991")

            response = {'Title':  'PG with 50% Marks',
                        'Status': 'FAIL',
                        'From Date': '',
                        'To Date': '18.09.1991',
                        'Reason': 'PG POR Date Not Under 18.09.1991'
                        }
    else:
        log.info("Step 4.2.8: PG Marks NOT IN RANGE ( >50% -- < 55%) ")

        response = {'Title':  'PG with 50% Marks',
                    'Status': 'FAIL',
                    'From Date': '',
                    'To Date': '18.09.1991',
                    'Reason': 'PG Marks NOT IN RANGE ( >50% -- < 55%)'
                    }

    return response


"""This method is used get the PG with 55% marks for GC / GT (NET/SLET/ CISR)
for SC / SCA / ST / Diff Abled (50% marks)

Name : pgCalc_55MarksforOCnGT_19091991_10072016
Parameters :
-----------

   dt_por - date of publication of results
   str_caste - Caste Category
   float_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""


@svc_pgCalc_55MarksforOCnGT_19091991_10072016.post(require_csrf=False)
def pgCalc_55MarksforOCnGT_19091991_10072016(request):
    response = "Hello 55 Marks for OC /GT "

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # TODO Move this to a config file or DB
    DT_POR_FROM_CUTOFF = datetime(1991, 9, 19).date()
    DT_POR_TO_CUTOFF = datetime(2016, 7, 10).date()

    # Get the values from the request object
    dt_pg_por = datetime.strptime(request.POST.get(
        "dt_pg_por", 'No POR Date Recieved'), '%d/%m/%Y').date()

    dt_elp_fromDt = datetime.strptime(request.POST.get(
        "dt_elp_fromDt", 'No From Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    dt_elp_toDt = datetime.strptime(request.POST.get(
        "dt_elp_toDt", 'No To Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    str_caste = str(request.POST.get("str_caste", 'No Caste Info Recieved'))

    bool_diffAbled = str2bool(request.POST.get("bool_diffAbled", 'False'))

    float_pgMarks = request.POST.get("float_pgMarks", 'No PG Marks Recieved')

    # Special Marks Override to be considered for SC Category
    percentileToBeConsidered = BusinessConstants.MARKS_55_PER

    # Entry Check Point if DT_POR_FROM_CUTOFF <= dt_por <= DT_POR_TO_CUTOFF
    # if DT_POR_FROM_CUTOFF <= dt_pg_por <= DT_POR_TO_CUTOFF:
    log.info("%s: Step 1 - POR Date within CutOff Date",
             pgCalc_55MarksforOCnGT_19091991_10072016)
    log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+str_caste)
    if str_caste == BusinessConstants.SC_CATEGORY or BusinessConstants.SCA_CATEGORY or BusinessConstants.ST_CATEGORY:
        log.info("pgCalc_55MarksforOCnGT : Step 2 - SC Category Check")
        percentileToBeConsidered = BusinessConstants.MARKS_50_PER

    diffAbledCheck = pg_diffAbCheck(bool_diffAbled, float_pgMarks,
                                    str_caste, percentileToBeConsidered, pgCalc_55MarksforOCnGT_19091991_10072016)

    if (diffAbledCheck == True):

        bool_sletStatus = str2bool(request.POST.get(
            "bool_sletStatus", 'False'))

        bool_netStatus = str2bool(request.POST.get(
            "bool_netStatus", 'False'))

        v_subjSlet = request.POST.get(
            "v_subjSlet", 'No SLET Marks Recieved')
        v_subjNet = request.POST.get("v_subjNet", 'No NET Marks Recieved')
        v_subjHandled = request.POST.get(
            "v_subjHandled", 'No Subject Handled Recieved')

        bool_equivFlag1 = False  # No Equivalence Check hence default Fault
        bool_equivFlag2 = False  # No Equivalence Check hence default Fault

        sletNetCheck = pg_sletNnet(
            bool_sletStatus, bool_netStatus, v_subjSlet, v_subjNet, v_subjHandled, bool_equivFlag1, bool_equivFlag1, pgCalc_55MarksforOCnGT_19091991_10072016)

        if(sletNetCheck == True):
            str_subjHandledStatus = request.POST.get(
                "str_subjHandledStatus", "No Subject Handled  Status Info Recieved")

            v_subjApplied = request.POST.get(
                "v_subjApplied", "No Subject Applied Info Recieved")  # Name of Post Applied  from DB.

            toConsider = pg_subjCheck(
                str_subjHandledStatus, v_subjHandled, v_subjApplied, 'False', 'NONE', pgCalc_55MarksforOCnGT_19091991_10072016)
        else:
            log.info("pgCalc_55MarksforOCnGT : Step 4 - Disability Check Failed ")

            response = {'Title':  'PG with 55% Marks and NET/SLET/CISR {SC/SCA/ST/DA-50%} (19.09.1991 - 17.07.2018) ',
                        'Status': 'FAIL',
                        'Reason': 'Disability Check Cut Off Marks Check Failed - Dont Consider This Date',
                        'From Date': '19.09.1991',
                        'To Date': '17.07.2018'
                        }
    print(toConsider)
    if(toConsider == True):

        str_dt_slet_por = request.POST.get(
            "dt_slet_por", '01/01/0001')

        str_dt_net_por = request.POST.get(
            "dt_net_por", '01/01/0001')
        print(str_dt_slet_por, len(str_dt_slet_por))
        print(str_dt_net_por, len(str_dt_net_por))

        if (str_dt_slet_por != '01/01/0001' and len(str_dt_slet_por) != 0):
            dt_slet_por = datetime.strptime(str_dt_slet_por, '%d/%m/%Y').date()
            dt_earliestFrom = dt_slet_por

        if (str_dt_net_por != '01/01/0001' and len(str_dt_net_por) != 0):
            dt_net_por = datetime.strptime(str_dt_net_por, '%d/%m/%Y').date()
            dt_earliestFrom = dt_net_por

        if(len(str_dt_slet_por) == 0 and len(str_dt_net_por) == 0):
            log.info(
                "pgCalc_55MarksforOCnGT : Step 5 - SLET & NET DATE ARE EMPTY  ")
            log.info("pgCalc_55MarksforOCnGT : Step 5.1 - Dont Consider This Date")

            response = {'Title':  'PG with 55% Marks and NET/SLET/CISR {SC/SCA/ST/DA-50%} (19.09.1991 - 17.07.2018) ',
                        'Status': 'FAIL',
                        'Reason': 'POR SLET & POR NET DATES ARE EMPTY - Dont Consider This Date',
                        'From Date': '19.09.1991',
                        'To Date': '17.07.2018'
                        }
        if(str_dt_slet_por != '01/01/0001' and str_dt_net_por != '01/01/0001' and len(str_dt_slet_por) != 0 and len(str_dt_net_por) != 0):
            # find the smallest of the 2 dates to give the benefit to the candidate
            dt_earliestFrom = min(dt_net_por, dt_slet_por)

        if(dt_elp_toDt > DT_POR_TO_CUTOFF):
            dt_top_date = DT_POR_TO_CUTOFF
        else:
            dt_top_date = dt_elp_toDt

        main_diff = relativedelta.relativedelta(dt_top_date, dt_earliestFrom)

        # Omission Date Range Calculation Starts Here

        master_time_range = DateTimeRange(dt_earliestFrom, dt_top_date)

        dt_omit_dt_range_list = request.POST.get(
            "dt_omit_ranges", "No List Present")

        res = json.loads(dt_omit_dt_range_list)
        dt_range_end_list = [0, 0]
        sub_diff = relativedelta.relativedelta(
            years=0, months=0, days=0, hours=0, minutes=0, seconds=0, microseconds=0)

        dt_omit_dt_range_list_to_consider = []

        for r in res:
            dt_start_date = datetime.strptime(
                r["dateRange"]["dt_range_start"], '%d/%m/%Y').date()
            dt_end_date = datetime.strptime(
                r["dateRange"]["dt_range_end"], '%d/%m/%Y').date()
            sub_range = DateTimeRange(dt_start_date, dt_end_date)
            print(sub_range)

            if(sub_range in master_time_range):
                sub_diff = sub_diff + relativedelta.relativedelta(
                    dt_end_date, dt_start_date)
                dt_range_str = "Start Date : " + \
                    str(dt_start_date), "End Date : "+str(dt_end_date)
                dt_omit_dt_range_list_to_consider.append(dt_range_str)

        diff = main_diff - sub_diff

        dt_diff_response = str(str(diff.years) + " Years and " + str(diff.months) +
                               " Months and " + str(diff.days) + " Days")

        dt_diff_original_response = str(str(main_diff.years) + " Years and " + str(main_diff.months) +
                                        " Months and " + str(main_diff.days) + " Days")

        dt_diff_omitted_response = str(str(sub_diff.years) + " Years and " + str(sub_diff.months) +
                                       " Months and " + str(sub_diff.days) + " Days")

        # Omission Date Range Calculation Ends Here

        META_DATA = {'POR Cut Off From Date': str(DT_POR_FROM_CUTOFF),
                     'POR Cut Off To Date': str(DT_POR_TO_CUTOFF),
                     'PG MARKS': float_pgMarks,
                     'PG POR Date ': str(dt_pg_por),
                     'From Date - Period Of Service ': str(dt_elp_fromDt),
                     'To Date - Period Of Service': str(dt_elp_toDt),
                     'Subject Handled Status ': str_subjHandledStatus,
                     'Subject Handled ': v_subjHandled,
                     'Subject Applied ': v_subjApplied,
                     'Caste': str_caste,
                     'Differently Abled': bool_diffAbled,
                     'SLET POR DATE': str_dt_slet_por,
                     'NET POR DATE': str_dt_net_por
                     }

        response = {'Title':  'PG with 55% Marks and NET/SLET/CISR {SC/SCA/ST/DA-50%} (19.09.1991 - 17.07.2018) ',
                    'Status': 'PASS',
                    'Eligible From Date': str(dt_earliestFrom),
                    'Eligible To Date': str(dt_top_date),
                    'Dates Ranges To Omit': dt_omit_dt_range_list_to_consider,
                    'Date Difference Original ': dt_diff_original_response,
                    'Date Difference Omitted': dt_diff_omitted_response,
                    'Date Difference To Consider': dt_diff_response,
                    'Subject Handled': v_subjHandled,
                    'From Date': '19.09.1991',
                    'To Date': '17.07.2018',
                    'META_DATA': META_DATA
                    }
    else:
        log.info("pgCalc_55MarksforOCnGT : Step 4 - All Checks Failed ")
        log.info("pgCalc_55MarksforOCnGT : Step 4.1 - Dont Consider This Date")

        response = {'Title':  'PG with 55% Marks and NET/SLET/CISR {SC/SCA/ST/DA-50%} (19.09.1991 - 17.07.2018) ',
                    'Status': 'FAIL',
                    'Reason': 'All Checks Failed - Dont Consider This Date',
                    'From Date': '19.09.1991',
                    'To Date': '17.07.2018'
                    }
    return response


"""This method is used get the PG with 55% marks for GC / GT (NET/SLET/ CISR)
for SC / SCA / ST / Diff Abled (50% marks)

Name : pgCalc_55MarksforNonOC_11072016_04102019
Parameters :
-----------

   dt_por - date of publication of results
   str_caste - Caste Category
   float_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""


@svc_pgCalc_55MarksforNonOC_11072016_04102019.post(require_csrf=False)
def pgCalc_55MarksforNonOC_11072016_04102019(request):
    response = "Hello 55 Marks for OC /GT "

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # TODO Move this to a config file or DB
    DT_POR_FROM_CUTOFF = datetime(2016, 7, 11).date()
    # Notification mentioned on 14 July 2020 by TRB SASI mme
    DT_POR_TO_CUTOFF = datetime(2019, 11, 15).date()

    dt_elp_toDt = datetime.strptime(request.POST.get(
        "dt_elp_toDt", 'No To Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    # Get the values from the request object
    dt_pg_por = datetime.strptime(request.POST.get(
        "dt_pg_por", 'No POR Date Recieved'), '%d/%m/%Y').date()

    str_caste = str(request.POST.get("str_caste", 'No Caste Info Recieved'))
    bool_diffAbled = str2bool(request.POST.get("bool_diffAbled", 'False'))
    float_pgMarks = request.POST.get("float_pgMarks", 'No PG Marks Recieved')

    # Special Marks Override to be considered for SC Category
    percentileToBeConsidered = BusinessConstants.MARKS_50_PER

    # Entry Check Point if DT_POR_FROM_CUTOFF <= dt_por <= DT_POR_TO_CUTOFF
    # if DT_POR_FROM_CUTOFF <= dt_pg_por <= DT_POR_TO_CUTOFF:
    log.info("%s: Step 1 - POR Date within CutOff Date",
             pgCalc_55MarksforNonOC_11072016_04102019)

    if str(str_caste) == BusinessConstants.OC_CATEGORY:
        log.info("pgCalc_55MarksforOCnGT : Step 2 - SC Category Check")
        percentileToBeConsidered = BusinessConstants.MARKS_55_PER

    diffAbledCheck = pg_diffAbCheck(bool_diffAbled, float_pgMarks,
                                    str_caste, percentileToBeConsidered, pgCalc_55MarksforNonOC_11072016_04102019)

    if (diffAbledCheck == True):

        bool_sletStatus = str2bool(request.POST.get(
            "bool_sletStatus", 'False'))

        bool_netStatus = str2bool(request.POST.get(
            "bool_netStatus", 'False'))
        v_subjSlet = request.POST.get(
            "v_subjSlet", 'No SLET Marks Recieved')
        v_subjNet = request.POST.get("v_subjNet", 'No NET Marks Recieved')
        v_subjHandled = request.POST.get(
            "v_subjHandled", 'No Subject Handled Recieved')

        bool_equivFlag1 = str2bool(request.POST.get(
            "bool_equivFlag1", 'False'))  # Equivalence Check 1
        bool_equivFlag2 = str2bool(request.POST.get(
            "bool_equivFlag2", 'False'))  # Equivalence Check 2

        sletNetCheck = pg_sletNnet(
            bool_sletStatus, bool_netStatus, v_subjSlet, v_subjNet, v_subjHandled, bool_equivFlag1, bool_equivFlag2, pgCalc_55MarksforNonOC_11072016_04102019)

        if(sletNetCheck == True):
            str_subjHandledStatus = request.POST.get(
                "str_subjHandledStatus", "No Subject Handled  Status Info Recieved")

            v_subjHandled = request.POST.get(
                "v_subjHandled", "No Subject Handled Applied Info Recieved")  # Name of Subject Handled from DB.

            v_subjApplied = request.POST.get(
                "v_subjApplied", "No Subject Applied Info Recieved")  # Name of Post Applied  from DB.

            toConsider = pg_subjCheck(
                str_subjHandledStatus, v_subjHandled, v_subjApplied, False, 'NONE', pgCalc_55MarksforNonOC_11072016_04102019)
        else:
            log.info("pgCalc_55MarksforOCnGT : Step 4 - Disability Check Failed ")

            response = {'Title':  'PG with 55% Marks and NET/SLET/CISR {OTHER THAN OC-50%} (18.07.2018 - 04.10.2019) ',
                        'Status': 'FAIL',
                        'Reason': 'Disability Check Cut Off Marks Check Failed - Dont Consider This Date',
                        'From Date': '18.07.2018',
                        'To Date': '15.11.2019'
                        }
    print(toConsider)
    if(toConsider == True):
        str_dt_slet_por = request.POST.get(
            "dt_slet_por", '01/01/0001')

        str_dt_net_por = request.POST.get(
            "dt_net_por", '01/01/0001')
        print(str_dt_slet_por, ">>>>>>>>>>>>>>>>>>>>>>", len(str_dt_slet_por))
        print(str_dt_net_por, ">>>>>>>>>>>>>>>>>>>>>>>>>", len(str_dt_net_por))

        if(str_dt_slet_por != '01/01/0001' and len(str_dt_slet_por) != 0):
            dt_slet_por = datetime.strptime(str_dt_slet_por, '%d/%m/%Y').date()
            dt_earliestFrom = dt_slet_por
        if(str_dt_net_por != '01/01/0001' and len(str_dt_net_por) != 0):
            dt_net_por = datetime.strptime(str_dt_net_por, '%d/%m/%Y').date()
            dt_earliestFrom = dt_net_por

        if(len(str_dt_slet_por) == 0 and len(str_dt_net_por) == 0):
            log.info(
                "pgCalc_55MarksforOCnGT : Step 5 - SLET & NET DATE ARE EMPTY  ")
            log.info("pgCalc_55MarksforOCnGT : Step 5.1 - Dont Consider This Date")

            response = {'Title':  'PG with 55% Marks and NET/SLET/CISR {OTHER THAN OC-50%} (18.07.2018 - 04.10.2019)',
                        'Status': 'FAIL',
                        'Reason': 'POR SLET & POR NET DATES ARE EMPTY - Dont Consider This Date',
                        'From Date': '18.07.2018',
                        'To Date': '15.11.2019'
                        }

        print(str_dt_slet_por, ">>>>>>>>>>>>", str_dt_net_por)

        if(str_dt_slet_por != '01/01/0001' and
           str_dt_net_por != '01/01/0001'):

            print(str_dt_slet_por, "1>>>>>>>>>>>>", str_dt_net_por)

            dt_slet_por = datetime.strptime(str_dt_slet_por, '%d/%m/%Y').date()
            dt_net_por = datetime.strptime(str_dt_net_por, '%d/%m/%Y').date()

            if(len(str_dt_slet_por) != 0 and
                    len(str_dt_net_por) != 0):
                # find the smallest of the 2 dates to give the benefit to the candidate
                dt_earliestFrom = min(dt_net_por, dt_slet_por)

        elif(str_dt_slet_por != '01/01/0001' and str_dt_net_por == '01/01/0001'):
            dt_slet_por = datetime.strptime(
                str_dt_slet_por, '%d/%m/%Y').date()
            dt_earliestForm = dt_slet_por
        elif(str_dt_slet_por == '01/01/0001' and str_dt_net_por != '01/01/0001'):
            dt_net_por = datetime.strptime(
                str_dt_net_por, '%d/%m/%Y').date()
            dt_earliestForm = dt_net_por

        if(dt_elp_toDt > DT_POR_TO_CUTOFF):
            dt_top_date = DT_POR_TO_CUTOFF
        else:
            dt_top_date = dt_elp_toDt

        # Omission Date Range Calculation Starts Here
        main_diff = relativedelta.relativedelta(dt_top_date, dt_earliestFrom)

        master_time_range = DateTimeRange(dt_earliestFrom, dt_top_date)

        dt_omit_dt_range_list = request.POST.get(
            "dt_omit_ranges", "No List Present")

        res = json.loads(dt_omit_dt_range_list)
        dt_range_end_list = [0, 0]
        sub_diff = relativedelta.relativedelta(
            years=0, months=0, days=0, hours=0, minutes=0, seconds=0, microseconds=0)

        dt_omit_dt_range_list_to_consider = []

        for r in res:
            dt_start_date = datetime.strptime(
                r["dateRange"]["dt_range_start"], '%d/%m/%Y').date()
            dt_end_date = datetime.strptime(
                r["dateRange"]["dt_range_end"], '%d/%m/%Y').date()
            sub_range = DateTimeRange(dt_start_date, dt_end_date)
            print(sub_range)

            if(sub_range in master_time_range):
                sub_diff = sub_diff + relativedelta.relativedelta(
                    dt_end_date, dt_start_date)
                dt_range_str = "Start Date : " + \
                    str(dt_start_date), "End Date : "+str(dt_end_date)
                dt_omit_dt_range_list_to_consider.append(dt_range_str)

        diff = main_diff - sub_diff

        dt_diff_response = str(str(diff.years) + " Years and " + str(diff.months) +
                               " Months and " + str(diff.days) + " Days")

        dt_diff_original_response = str(str(main_diff.years) + " Years and " + str(main_diff.months) +
                                        " Months and " + str(main_diff.days) + " Days")

        dt_diff_omitted_response = str(str(sub_diff.years) + " Years and " + str(sub_diff.months) +
                                       " Months and " + str(sub_diff.days) + " Days")

        # Omission Date Range Calculation Ends Here

        META_DATA = {'POR Cut Off From Date': str(DT_POR_FROM_CUTOFF),
                     'POR Cut Off To Date': str(DT_POR_TO_CUTOFF),
                     'PG MARKS': float_pgMarks,
                     'PG POR Date ': str(dt_pg_por),
                     'To Date - Period Of Service': str(dt_elp_toDt),
                     'Subject Handled Status ': str_subjHandledStatus,
                     'Subject Handled ': v_subjHandled,
                     'Subject Applied ': v_subjApplied,
                     'Caste': str_caste,
                     'Differently Abled': bool_diffAbled,
                     'SLET POR DATE': str_dt_slet_por,
                     'NET POR DATE': str_dt_net_por
                     }
        response = {'Title':  'PG with 55% Marks and NET/SLET/CISR {OTHER THAN OC-50%} (18.07.2018 - 04.10.2019) ',
                    'Status': 'PASS',
                    'Eligible From Date': str(dt_earliestFrom),
                    'Eligible To Date': str(dt_top_date),
                    'Dates Ranges To Omit': dt_omit_dt_range_list_to_consider,
                    'Date Difference Original ': dt_diff_original_response,
                    'Date Difference Omitted': dt_diff_omitted_response,
                    'Date Difference To Consider': dt_diff_response,
                    'Subject Handled': v_subjHandled,
                    'From Date': '18.07.2018',
                    'To Date': '15.11.2019',
                    'META_DATA': META_DATA}
    else:
        log.info("pgCalc_55MarksforOCnGT : Step 4 - All Checks Failed ")
        log.info("pgCalc_55MarksforOCnGT : Step 4.1 - Dont Consider This Date")

        response = {'Title':  'PG with 55% Marks and NET/SLET/CISR {OTHER THAN OC-50%} (18.07.2018 - 04.10.2019) ',
                    'Status': 'FAIL',
                    'Reason': 'All Checks Failed - Dont Consider This Date',
                    'From Date': '18.07.2018',
                    'To Date': '15.11.2019'
                    }

    return response


"""This method is used check the PHD submitted before 31.12.2002
for SC / SCA / ST / Diff Abled (50% marks)

Name : phdCalc_submtdbfr_31122002
Parameters :
-----------

   dt_por - date of publication of results
   str_caste - Caste Category
   float_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""


@svc_phdCalc_submtdbfr_31122002.post(require_csrf=False)
def phdCalc_submtdbfr_31122002(request):
    response = "Hello 55 Marks for OC /GT "

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # TODO Move this to a config file or DB
    DT_POR_FROM_CUTOFF = datetime(2002, 7, 31).date()
    DT_POR_TO_CUTOFF = datetime(2006, 6, 13).date()
    DT_PHD_TO_CUTOFF = datetime(2002, 12, 31).date()

    # Get the values from the request object
    dt_pg_por = datetime.strptime(request.POST.get(
        "dt_pg_por", 'No PG POR Date Recieved'), '%d/%m/%Y').date()

    dt_phd_por_str = request.POST.get(("dt_phd_por", ''), '%d/%m/%Y')
    dt_phd_por = ''
    if(dt_phd_por_str != ''):
        dt_phd_por = datetime.strptime(dt_phd_por_str).date()
    else:
        response = {'Title':  'Submitted PHD before 31.12.2002 ( From Date : 31.07.2002 - To Date : 13.06.2006) ',
                    'Status': 'FAIL',
                    'Response ': 'No PHD Date Present',
                    'From Date': '31.07.2002',
                    'To Date': '13.06.2006'
                    }

    dt_elp_fromDt = datetime.strptime(request.POST.get(
        "dt_elp_fromDt", 'No From Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    dt_elp_toDt = datetime.strptime(request.POST.get(
        "dt_elp_toDt", 'No To Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    str_caste = str(request.POST.get("str_caste", 'No Caste Info Recieved'))
    bool_diffAbled = str2bool(request.POST.get("bool_diffAbled", 'False'))
    float_pgMarks = request.POST.get("float_pgMarks", 'No PG Marks Recieved')

    str_subjHandledStatus = request.POST.get(
        "str_subjHandledStatus", "No Subject Handled  Status Info Recieved")

    # Special Marks Override to be considered for SC Category
    percentileToBeConsidered = BusinessConstants.MARKS_55_PER

    # Entry Check Point if DT_POR_FROM_CUTOFF <= dt_por <= DT_POR_TO_CUTOFF
    # if DT_POR_FROM_CUTOFF <= dt_pg_por <= DT_POR_TO_CUTOFF:
    # log.info("%s: Step 1 - POR Date within CutOff Date",
    #  phdCalc_submtdbfr_31122002)

    if str(str_caste) == BusinessConstants.SC_CATEGORY:
        log.info("pgCalc_55MarksforOCnGT : Step 2 - SC Category Check")

        percentileToBeConsidered = BusinessConstants.MARKS_50_PER

    diffAbledCheck = pg_diffAbCheck(bool_diffAbled, float_pgMarks,
                                    str_caste, percentileToBeConsidered, phdCalc_submtdbfr_31122002)

    if (diffAbledCheck == True):

        if dt_pg_por <= DT_PHD_TO_CUTOFF:  # PHD Cutoff Check
            log.info("%s: Step 1 - POR Date within CutOff Date",
                     phdCalc_submtdbfr_31122002)

            bool_chk1 = str(request.POST.get(
                "bool_chk1", 'Boolean Chk1  Info Not Recieved'))

            v_subjHandled = request.POST.get(
                "v_subjHandled", 'No Subject Handled Recieved')

            v_subjApplied = request.POST.get(
                "v_subjApplied", 'No Subject Applied Recieved')

            bool_equivFlag1 = request.POST.get(
                "bool_equivFlag1", 'false')  # Equivalence Check 1

            v_equiv1Sub = request.POST.get(
                "v_equiv1Sub", 'Equivalence 1 Subject Not Recieved')  # Equivalence Check 1

            if(bool_chk1 == True):
                toConsider = pg_subjCheck(
                    str_subjHandledStatus, v_subjHandled, v_subjApplied, bool_equivFlag1, v_equiv1Sub, phdCalc_submtdbfr_31122002)
    else:
        response = {'Title':  'Submitted PHD before 31.12.2002 ( From Date : 31.07.2002 - To Date : 13.06.2006) ',
                    'Status': 'FAIL',
                    'Response ': 'Disability Check Failed',
                    'From Date': '31.07.2002',
                    'To Date': '13.06.2006'
                    }

    print(toConsider)

    if(toConsider == True):
        # Find difference between PHD POR Date and Last Date 31.06.2006
        # diff = relativedelta.relativedelta(dt_elp_toDt, dt_elp_fromDt)

        if(dt_elp_toDt > DT_POR_TO_CUTOFF):
            dt_top_date = DT_POR_TO_CUTOFF
        else:
            dt_top_date = dt_elp_toDt

        main_diff = relativedelta.relativedelta(dt_elp_toDt, dt_phd_por)

        # Omission Date Range Calculation Starts Here
        master_time_range = DateTimeRange(dt_phd_por, dt_elp_toDt)

        dt_omit_dt_range_list = request.POST.get(
            "dt_omit_ranges", "No List Present")

        res = json.loads(dt_omit_dt_range_list)
        dt_range_end_list = [0, 0]
        sub_diff = relativedelta.relativedelta(
            years=0, months=0, days=0, hours=0, minutes=0, seconds=0, microseconds=0)

        dt_omit_dt_range_list_to_consider = []

        for r in res:
            dt_start_date = datetime.strptime(
                r["dateRange"]["dt_range_start"], '%d/%m/%Y').date()
            dt_end_date = datetime.strptime(
                r["dateRange"]["dt_range_end"], '%d/%m/%Y').date()
            sub_range = DateTimeRange(dt_start_date, dt_end_date)
            print(sub_range)

            if(sub_range in master_time_range):
                sub_diff = sub_diff + relativedelta.relativedelta(
                    dt_end_date, dt_start_date)
                dt_range_str = "Start Date : " + \
                    str(dt_start_date), "End Date : "+str(dt_end_date)
                dt_omit_dt_range_list_to_consider.append(dt_range_str)

        diff = main_diff - sub_diff

        dt_diff_response = str(str(diff.years) + " Years and " + str(diff.months) +
                               " Months and " + str(diff.days) + " Days")

        dt_diff_original_response = str(str(main_diff.years) + " Years and " + str(main_diff.months) +
                                        " Months and " + str(main_diff.days) + " Days")

        dt_diff_omitted_response = str(str(sub_diff.years) + " Years and " + str(sub_diff.months) +
                                       " Months and " + str(sub_diff.days) + " Days")

        # Omission Date Range Calculation Ends Here

        META_DATA = {'POR Cut Off From Date': str(DT_POR_FROM_CUTOFF),
                     'POR Cut Off To Date': str(DT_POR_TO_CUTOFF),
                     'PG MARKS': float_pgMarks,
                     'PG POR Date ': str(dt_pg_por),
                     'From Date - Period Of Service ': str(dt_elp_fromDt),
                     'To Date - Period Of Service': str(dt_elp_toDt),
                     'Subject Handled Status ': str_subjHandledStatus,
                     'Subject Handled ': v_subjHandled,
                     'Subject Applied ': v_subjApplied,
                     'Caste': str_caste,
                     'Differently Abled': bool_diffAbled
                     }

        response = {'Title':  'Submitted PHD before 31.12.2002 ( From Date : 31.07.2002 - To Date : 13.06.2006) ',
                    'Status': 'PASS',
                    'Eligible From Date': str(dt_phd_por),
                    'Eligible To Date': str(dt_elp_toDt),
                    'Dates Ranges To Omit': dt_omit_dt_range_list_to_consider,
                    'Date Difference Original ': dt_diff_original_response,
                    'Date Difference Omitted': dt_diff_omitted_response,
                    'Date Difference To Consider': dt_diff_response,
                    'Subject Handled': v_subjHandled,
                    'From Date': '31.07.2002',
                    'To Date': '13.06.2006',
                    'META_DATA': META_DATA}

    else:
        response = {'Title':  'Submitted PHD before 31.12.2002 ( From Date : 31.07.2002 - To Date : 13.06.2006) ',
                    'Status': 'FAIL',
                    'Response ': 'phdCalc_submtdbfr_31122002: Step 3 - All Checks Failed - Dont Consider This Date',
                    'From Date': '31.07.2002',
                    'To Date': '13.06.2006'}

    return response


"""This method is used check the PG , PHD  with
    Corespondence ,
    Distance Education
    Open University

    submitted before 02.04.2009
for SC / SCA / ST / Diff Abled (50% marks)

Name : pg_phdCalc_CS_DE_OU_submtdbfr_02042009
Parameters :
-----------

   dt_por - date of publication of results
   str_caste - Caste Category
   float_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""


@svc_pg_phdCalc_CS_DE_OU_submtdbfr_02042009.post(require_csrf=False)
def pg_phdCalc_CS_DE_OU_submtdbfr_02042009(request):
    response = "Hello 55 Marks for OC /GT "

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # TODO Move this to a config file or DB
    # Corrected by TRB Sasi Mme as per GO. on 14 July 2020
    DT_POR_FROM_CUTOFF = " NO RESTRICTION "
    # Corrected by TRB Sasi Mme as per GO. on 14 July 2020
    DT_POR_TO_CUTOFF = datetime(2019, 11, 15).date()

    DT_PHD_TO_CUTOFF = datetime(2009, 4, 2).date()

    # Get the values from the request object
    dt_pg_por = datetime.strptime(request.POST.get(
        "dt_pg_por", 'No PG POR Date Recieved'), '%d/%m/%Y').date()

    dt_phd_por = datetime.strptime(request.POST.get(
        "dt_phd_por", 'No PHD POR Date Recieved'), '%d/%m/%Y').date()

    dt_elp_fromDt = datetime.strptime(request.POST.get(
        "dt_elp_fromDt", 'No From Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    dt_elp_toDt = datetime.strptime(request.POST.get(
        "dt_elp_toDt", 'No To Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    str_caste = str(request.POST.get("str_caste", 'No Caste Info Recieved'))
    bool_diffAbled = str2bool(request.POST.get("bool_diffAbled", 'False'))
    float_pgMarks = request.POST.get("float_pgMarks", 'No PG Marks Recieved')

    str_subjHandledStatus = request.POST.get(
        "str_subjHandledStatus", "No Subject Handled  Status Info Recieved")

    # Special Marks Override to be considered for SC Category
    percentileToBeConsidered = BusinessConstants.MARKS_55_PER

    # Entry Check Point if DT_POR_FROM_CUTOFF <= dt_por <= DT_POR_TO_CUTOFF
    # if DT_POR_FROM_CUTOFF <= dt_pg_por <= DT_POR_TO_CUTOFF:
    #     log.info("%s: Step 1 - POR Date within CutOff Date",
    #              phdCalc_submtdbfr_31122002)

    if str(str_caste) == BusinessConstants.SC_CATEGORY:
        log.info("pgCalc_55MarksforOCnGT : Step 2 - SC Category Check")

        percentileToBeConsidered = BusinessConstants.MARKS_50_PER

    diffAbledCheck = pg_diffAbCheck(bool_diffAbled, float_pgMarks,
                                    str_caste, percentileToBeConsidered, pg_phdCalc_CS_DE_OU_submtdbfr_02042009)

    if (diffAbledCheck == True):

        if dt_pg_por <= DT_PHD_TO_CUTOFF:  # PHD Cutoff Check
            log.info("%s: Step 1 - POR Date within CutOff Date",
                     phdCalc_submtdbfr_31122002)

            bool_chk1 = str(request.POST.get(
                "bool_chk1", 'Boolean Chk1  Info Not Recieved'))

            v_subjHandled = request.POST.get(
                "v_subjHandled", 'No Subject Handled Recieved')

            v_subjApplied = request.POST.get(
                "v_subjApplied", 'No Subject Applied Recieved')

            bool_equivFlag1 = request.POST.get(
                "bool_equivFlag1", 'false')  # Equivalence Check 1

            v_equiv1Sub = request.POST.get(
                "v_equiv1Sub", 'Equivalence 1 Subject Not Recieved')  # Equivalence Check 1

            if(bool_chk1 == True):
                toConsider = pg_subjCheck(
                    str_subjHandledStatus, v_subjHandled, v_subjApplied, bool_equivFlag1, v_equiv1Sub, pg_phdCalc_CS_DE_OU_submtdbfr_02042009)

    print(toConsider)
    if(toConsider == True):
        # response = str(dt_elp_toDt - dt_elp_fromDt)
        # diff = relativedelta.relativedelta(dt_elp_toDt, dt_elp_fromDt)
        if(dt_elp_toDt > DT_PHD_TO_CUTOFF):
            dt_top_date = DT_PHD_TO_CUTOFF
        else:
            dt_top_date = dt_elp_toDt

        # Find difference between PHD POR Date and 02.04.2009
        main_diff = relativedelta.relativedelta(dt_top_date, dt_phd_por)

        # Omission Date Range Calculation Starts Here
        master_time_range = DateTimeRange(dt_phd_por, dt_top_date)

        dt_omit_dt_range_list = request.POST.get(
            "dt_omit_ranges", "No List Present")

        res = json.loads(dt_omit_dt_range_list)
        dt_range_end_list = [0, 0]
        sub_diff = relativedelta.relativedelta(
            years=0, months=0, days=0, hours=0, minutes=0, seconds=0, microseconds=0)

        dt_omit_dt_range_list_to_consider = []

        for r in res:
            dt_start_date = datetime.strptime(
                r["dateRange"]["dt_range_start"], '%d/%m/%Y').date()
            dt_end_date = datetime.strptime(
                r["dateRange"]["dt_range_end"], '%d/%m/%Y').date()
            sub_range = DateTimeRange(dt_start_date, dt_end_date)
            print(sub_range)

            if(sub_range in master_time_range):
                sub_diff = sub_diff + relativedelta.relativedelta(
                    dt_end_date, dt_start_date)
                dt_range_str = "Start Date : " + \
                    str(dt_start_date), "End Date : "+str(dt_end_date)
                dt_omit_dt_range_list_to_consider.append(dt_range_str)

        diff = main_diff - sub_diff

        dt_diff_response = str(str(diff.years) + " Years and " + str(diff.months) +
                               " Months and " + str(diff.days) + " Days")

        dt_diff_original_response = str(str(main_diff.years) + " Years and " + str(main_diff.months) +
                                        " Months and " + str(main_diff.days) + " Days")

        dt_diff_omitted_response = str(str(sub_diff.years) + " Years and " + str(sub_diff.months) +
                                       " Months and " + str(sub_diff.days) + " Days")

        # Omission Date Range Calculation Ends Here

        META_DATA = {'POR Cut Off From Date': str(DT_POR_FROM_CUTOFF),
                     'POR Cut Off To Date': str(DT_POR_TO_CUTOFF),
                     'PG MARKS': float_pgMarks,
                     'PG POR Date ': str(dt_pg_por),
                     'From Date - Period Of Service ': str(dt_elp_fromDt),
                     'To Date - Period Of Service': str(dt_elp_toDt),
                     'Subject Handled Status ': str_subjHandledStatus,
                     'Subject Handled ': v_subjHandled,
                     'Subject Applied ': v_subjApplied,
                     'Caste': str_caste,
                     'Differently Abled': bool_diffAbled
                     }

        response = {'Title':  'PG with PHD thru CR/DE/OU ( To Date : 02.04.2009)',
                    'Status': 'PASS',
                    'Eligible From Date': str(dt_phd_por),
                    'Eligible To Date': str(dt_top_date),
                    'Dates Ranges To Omit': dt_omit_dt_range_list_to_consider,
                    'Date Difference Original ': dt_diff_original_response,
                    'Date Difference Omitted': dt_diff_omitted_response,
                    'Date Difference To Consider': dt_diff_response,
                    'Subject Handled': v_subjHandled,
                    'From Date': '',
                    'To Date': '02.04.2009',
                    'META_DATA': META_DATA}

    else:
        response = {'Title':  'PG with PHD thru CR/DE/OU ( To Date : 02.04.2009)',
                    'Status': 'FAIL',
                    'Response': 'Step 3 - All Checks Failed - Dont Consider This Date',
                    'From Date': '',
                    'To Date': '02.04.2009'
                    }
    return response


"""This method is used check the PG , PHD  with
    Corespondence ,
    Distance Education
    Open University

    submitted before 02.04.2009
for SC / SCA / ST / Diff Abled (50% marks)

Name : pg_phdCalc_CS_DE_OU_submtdbfr_04102019
Parameters :
-----------

   dt_por - date of publication of results
   str_caste - Caste Category
   float_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""


@svc_pg_phdCalc_CS_DE_OU_submtdbfr_04102019.post(require_csrf=False)
def pg_phdCalc_CS_DE_OU_submtdbfr_04102019(request):
    response = "Hello 55 Marks for OC /GT "

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # TODO Move this to a config file or DB
    DT_POR_FROM_CUTOFF = datetime(
        2018, 7, 18).date()  # TODO: to be confirmed
    DT_POR_TO_CUTOFF = datetime(
        2019, 10, 4).date()  # TODO: to be confirmed

    DT_PHD_TO_CUTOFF = datetime(2019, 10, 4).date()

    v_subjHandled = request.POST.get(
        "v_subjHandled", 'No Subject Handled Recieved')

    v_subjApplied = request.POST.get(
        "v_subjApplied", 'No Subject Applied Recieved')

    # Get the values from the request object
    dt_pg_por = datetime.strptime(request.POST.get(
        "dt_pg_por", 'No PG POR Date Recieved'), '%d/%m/%Y').date()

    dt_phd_por = datetime.strptime(request.POST.get(
        "dt_phd_por", 'No PHD POR Date Recieved'), '%d/%m/%Y').date()

    dt_elp_fromDt = datetime.strptime(request.POST.get(
        "dt_elp_fromDt", 'No From Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    dt_elp_toDt = datetime.strptime(request.POST.get(
        "dt_elp_toDt", 'No To Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    str_caste = str(request.POST.get("str_caste", 'No Caste Info Recieved'))
    bool_diffAbled = str2bool(request.POST.get("bool_diffAbled", 'False'))
    float_pgMarks = request.POST.get("float_pgMarks", 'No PG Marks Recieved')

    str_subjHandledStatus = request.POST.get(
        "str_subjHandledStatus", "No Subject Handled  Status Info Recieved")

    # Special Marks Override to be considered for SC Category
    percentileToBeConsidered = BusinessConstants.MARKS_55_PER

    # Entry Check Point if DT_POR_FROM_CUTOFF <= dt_por <= DT_POR_TO_CUTOFF
    # if DT_POR_FROM_CUTOFF <= dt_pg_por <= DT_POR_TO_CUTOFF:
    #     log.info("%s: Step 1 - POR Date within CutOff Date",
    #              phdCalc_submtdbfr_31122002)

    if str(str_caste) == BusinessConstants.SC_CATEGORY:
        log.info("pgCalc_55MarksforOCnGT : Step 2 - SC Category Check")

        percentileToBeConsidered = BusinessConstants.MARKS_50_PER

    diffAbledCheck = pg_diffAbCheck(bool_diffAbled, float_pgMarks,
                                    str_caste, percentileToBeConsidered, pg_phdCalc_CS_DE_OU_submtdbfr_04102019)

    if (diffAbledCheck == True):

        if dt_pg_por <= DT_PHD_TO_CUTOFF:  # PHD Cutoff Check
            log.info("%s: Step 1 - POR Date within CutOff Date",
                     phdCalc_submtdbfr_31122002)

            bool_chk1 = str2bool(str(request.POST.get(
                "bool_chk1", 'False')))

            bool_equivFlag1 = request.POST.get(
                "bool_equivFlag1", 'false')  # Equivalence Check 1

            v_equiv1Sub = request.POST.get(
                "v_equiv1Sub", 'Equivalence 1 Subject Not Recieved')  # Equivalence Check 1

            if(bool_chk1):
                print("bool check 1 ...............")
                toConsider = pg_subjCheck(
                    str_subjHandledStatus, v_subjHandled, v_subjApplied, bool_equivFlag1, v_equiv1Sub, pg_phdCalc_CS_DE_OU_submtdbfr_04102019)

    print(toConsider)
    if(toConsider == True):
        # response = str(dt_elp_toDt - dt_elp_fromDt)
        # diff = relativedelta.relativedelta(dt_elp_toDt, dt_elp_fromDt)
        if(dt_elp_toDt > DT_PHD_TO_CUTOFF):
            dt_top_date = DT_PHD_TO_CUTOFF
        else:
            dt_top_date = dt_elp_toDt
        # find difference of dates from PG_POR and 04.10.2019
        main_diff = relativedelta.relativedelta(DT_PHD_TO_CUTOFF, dt_phd_por)

        # Omission Date Range Calculation Starts Here
        master_time_range = DateTimeRange(dt_phd_por, DT_PHD_TO_CUTOFF)

        dt_omit_dt_range_list = request.POST.get(
            "dt_omit_ranges", "No List Present")

        res = json.loads(dt_omit_dt_range_list)
        dt_range_end_list = [0, 0]
        sub_diff = relativedelta.relativedelta(
            years=0, months=0, days=0, hours=0, minutes=0, seconds=0, microseconds=0)

        dt_omit_dt_range_list_to_consider = []

        for r in res:
            dt_start_date = datetime.strptime(
                r["dateRange"]["dt_range_start"], '%d/%m/%Y').date()
            dt_end_date = datetime.strptime(
                r["dateRange"]["dt_range_end"], '%d/%m/%Y').date()
            sub_range = DateTimeRange(dt_start_date, dt_end_date)
            print(sub_range)

            if(sub_range in master_time_range):
                sub_diff = sub_diff + relativedelta.relativedelta(
                    dt_end_date, dt_start_date)
                dt_range_str = "Start Date : " + \
                    str(dt_start_date), "End Date : "+str(dt_end_date)
                dt_omit_dt_range_list_to_consider.append(dt_range_str)

        diff = main_diff - sub_diff

        dt_diff_response = str(str(diff.years) + " Years and " + str(diff.months) +
                               " Months and " + str(diff.days) + " Days")

        dt_diff_original_response = str(str(main_diff.years) + " Years and " + str(main_diff.months) +
                                        " Months and " + str(main_diff.days) + " Days")

        dt_diff_omitted_response = str(str(sub_diff.years) + " Years and " + str(sub_diff.months) +
                                       " Months and " + str(sub_diff.days) + " Days")

        # Omission Date Range Calculation Ends Here

        META_DATA = {'POR Cut Off From Date': str(DT_POR_FROM_CUTOFF),
                     'POR Cut Off To Date': str(DT_POR_TO_CUTOFF),
                     'PG MARKS': float_pgMarks,
                     'PG POR Date ': str(dt_pg_por),
                     'From Date - Period Of Service ': str(dt_elp_fromDt),
                     'To Date - Period Of Service': str(dt_elp_toDt),
                     'Subject Handled Status ': str_subjHandledStatus,
                     'Subject Handled ': v_subjHandled,
                     'Subject Applied ': v_subjApplied,
                     'Caste': str_caste,
                     'Differently Abled': bool_diffAbled
                     }

        response = {'Title':  'PG with PHD ( To Date : 04.10.2019) ',
                    'Status': 'PASS',
                    'Eligible From Date': str(dt_phd_por),
                    'Eligible To Date': str(DT_POR_TO_CUTOFF),
                    'Dates Ranges To Omit': dt_omit_dt_range_list_to_consider,
                    'Date Difference Original ': dt_diff_original_response,
                    'Date Difference Omitted': dt_diff_omitted_response,
                    'Date Difference To Consider': dt_diff_response,
                    'Subject Handled': v_subjHandled,
                    'From Date': '',
                    'To Date': '04.10.2019',
                    'META_DATA': META_DATA
                    }

    else:
        response = "phdCalc_submtdbfr_31122002 : Step 3 - All Checks Failed - Dont Consider This Date "
        response = {'Title':  'PG with PHD ( To Date : 04.10.2019) ',
                    'Status': 'FAIL',
                    'Response': response,
                    'Subject Handled ': v_subjHandled,
                    'From Date': '',
                    'To Date': '04.10.2019'
                    }
    return response
