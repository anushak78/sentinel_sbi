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


log = logging.getLogger(__name__)

svc_calc_mphil_bfr31121993_phd_bfr31121993 = Service(
    name="biz.api.scores.calc_mphil_bfr31121993_phd_bfr31121993", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/calc_mphil_bfr31121993_phd_bfr31121993", cors_policy=cors.POLICY)


svc_calc_pgNmphil_bfr14062006_aftr29062010 = Service(
    name="biz.api.scores.calc_pgNmphil_bfr14062006_aftr29062010", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/calc_pgNmphil_bfr14062006_aftr29062010", cors_policy=cors.POLICY)


svc_calc_pgNmphil_CROUDE_bfr14062006_aftr242009 = Service(
    name="biz.api.scores.calc_pgNmphil_CROUDE_bfr14062006_aftr242009", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/calc_pgNmphil_CROUDE_bfr14062006_aftr242009", cors_policy=cors.POLICY)


"""
This method is to check for SLET / NET Check

Name : pg_sletNnet
PARAMETERS :
-----------

sletNnetStatus - Slet or Net Toggle Status
v_subHandled - Subject handled during Course
v_subjSlet - Subject applied for SLET
v_subjNet - Subject applied for NET
fnName - Function Name for Logging

"""


def pg_sletNnet(sletStatus, netStatus, v_subjSlet, v_subjNet, v_subjHandled, bool_equivFlag1, bool_equivFlag2, fnName):

    if (sletStatus == "True"):
        log.info("%s - Step 4.2.1 - NET STATUS MATCHES", fnName)

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

    elif (netStatus == "True"):
        log.info("%s - Step 4.2.1 - SLET Status matches", fnName)

        if(str(v_subjHandled) == str(v_subjSlet)):
            log.info(
                "%s - Step 4.2.2 - Slet Subject & Subject Handled Matches ", fnName)
            log.info("%s - Step 4.2.3 - Consider This Date", fnName)
            return True
        else:

            if(bool_equivFlag1 == True or bool_equivFlag2 == True):
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
    if(bool_diffAbled == True):
        log.info("%s - Step 3 - Candidate in Differently Abled Category", fnName)

        if(float(float_pgMarks) >= BusinessConstants.MARKS_50_PER):
            log.info("%s - Step 3.1 - >= 50% Marks Pass", fnName)
            log.info("%s - Step 3.2 - Consider this Date", fnName)
            return True

        else:
            log.info("%s - Step 3.3 - 50% Marks Failed", fnName)
            log.info("%s - Step 3.4 -  Dont Consider This Date", fnName)
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
        log.info("%s - Step 4.2.1 - Subject Handled matches", fnName)

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
                    "%s - Step 4.2.4 - Equivalence Check Failed &  does not match", fnName)
                log.info("%s - Step 4.2.5 - Dont Consider this Date", fnName)
                return False
    else:
        log.info("%s - Step 4.2.6 - Subject Handled does not match", fnName)
        log.info("%s - Step 4.2.7 - Dont Consider this date", fnName)
        return False


"""
This method is to check for Subject Check if Subject Handled and Subject Applied
are the same

Name : pg_subjCheck_2equiv
PARAMETERS :
-----------

str_subjHandledStatus - Subject handled Status
v_subHandled - Subject handled during Course
v_subjApplied - Subject applied for Post
fnName - Function Name for Logging
bool_equivFlag1 - equivalence flag for Checking Equivalence Subject
v_equiv1Sub - Subject for Equivalence  1
"""


def pg_subjCheck_2equiv(str_subjHandledStatus, v_subjHandled, v_subjApplied, bool_equivFlag1, v_equiv1Sub, bool_equivFlag2, v_equiv2Sub, fnName):

    if (int(str_subjHandledStatus) == BusinessConstants.MATCHED):
        log.info("%s - Step 4.2.1 - Subject Handled matches", fnName)

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
            elif (bool_equivFlag2 == True):
                if(str(v_equiv2Sub) == str(v_subjApplied)):
                    log.info(
                        "%s - Step 4.2.5 - Subject Handled Matches Subject Applied ", fnName)
                    log.info("%s - Step 4.2.6 - Consider This Date", fnName)
                    return True
                else:
                    log.info(
                        "%s - Step 4.2.7 - Equivalence Subj And Sub Applied Check does not match", fnName)
                    log.info("%s - Step 4.2.8 - Dont Consider this Date", fnName)
                    return False
            else:
                log.info(
                    "%s - Step 4.2.9 - Equivalence Check Failed &  does not match", fnName)
                log.info("%s - Step 4.2.10 - Dont Consider this Date", fnName)
                return False
    else:
        log.info("%s - Step 4.2.11 - Subject Handled does not match", fnName)
        log.info("%s - Step 4.2.12 - Dont Consider this date", fnName)
        return False


"""This method is used get the PG Validity Check with 50% marks and above

Name : pg_validity_check
Parameters :
-----------

   dt_pg_por - date of publication of PG results
   str_caste - Caste Category
   float_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""


def pg_validity_check_mphil_calc(dt_pg_por, str_caste, pgMarks, diffAbl, str_subjHandledStatus, v_subjHandled, v_subjApplied):
    response = "Consider This Date"

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # TODO Move this to a config file or DB
    DT_TOP_POR_CUTOFF = datetime(1991, 9, 19).date()
    DT_BTM_POR_CUTOFF = datetime(2002, 7, 30).date()

    # Entry Check Point if POR < CUT OFF DATE
    if DT_BTM_POR_CUTOFF >= dt_pg_por <= DT_TOP_POR_CUTOFF:
        log.info("Step 1 - POR Date within CutOff Date")

        if str_caste == BusinessConstants.OC_CATEGORY:
            log.info("Step 2 - Candidate in OC Category")

            if(bool_diffAbled):
                log.info("Step 3 - Candidate in Differently Abled Category")

                if(float(float_pgMarks) >= BusinessConstants.MARKS_50_PER):
                    log.info("Step 3.1 - >= 50% Marks Pass")
                    log.info("Step 3.2 - Consider this Date")
                    toConsider = pg_subjCheck(str_subjHandledStatus,
                                              v_subjHandled, v_subjApplied, false, NONE, pg_validity_check_mphil_calc)
                else:
                    log.info("Step 3.3 - 50% Marks Failed")
                    log.info("Step 3.4 -  Dont Consider This Date")

                    response = "Step 3.3 - 50% Marks Failed - Dont Consider This Date "

            else:
                log.info("Step 4 - Candidate Fit & Abled")

                if(float(float_pgMarks) >= BusinessConstants.MARKS_55_PER):
                    log.info("Step 4.1 - >= 55% Marks Pass")
                    log.info("Step 4.2 -  Consider this Date")
                    toConsider = pg_subjCheck(str_subjHandledStatus,
                                              v_subjHandled, v_subjApplied, false, NONE, pg_validity_check_mphil_calc)

                    if(toConsider != True):
                        response = " Step 4.3 - All Checks Failed - Dont Consider This Date"

                else:
                    log.info("Step 4.4 - 55% Marks Failed ")
                    log.info("Step 4.5 -  Dont Consider This Date")
                    response = "Step 4.6 - 55% Marks Failed - Dont Consider This Date"

        elif str_caste == BusinessConstants.OC_OTHER_STATE:
            log.info("Step 4.7 - Candidate in OC Other State Category")
            toConsider = pg_subjCheck(str_subjHandledStatus,
                                      v_subjHandled, v_subjApplied, False, 'NONE', pg_validity_check_mphil_calc)
            if(toConsider != True):
                response = " Step 4.8 - All Checks Failed - Dont Consider This Date"

    else:
        log.info("Step 4.9 - All Checks Failed ")
        log.info("Step 4.10 - Dont Consider This Date")
        response = " Step 4.11 - All Checks Failed - Dont Consider This Date "

    return toConsider, response


"""This method is used get the PG Validity Check with OC , BC , SC etc and their respective mark %

Name : pg_validity_check_sc_criteria
Parameters :
-----------

   dt_pg_por - date of publication of PG results
   str_caste - Caste Category
   float_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""


def pg_validity_check_sc_criteria(dt_pg_por, str_caste, float_pgMarks, bool_diffAbled, str_subjHandledStatus, v_subjHandled, v_subjApplied):
    response = "Hello 55 Marks for OC /GT "

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # TODO Move this to a config file or DB
    DT_POR_FROM_CUTOFF = datetime(2006, 6, 14).date()
    DT_POR_TO_CUTOFF = datetime(2010, 6, 29).date()

    # Special Marks Override to be considered for SC Category
    percentileToBeConsidered = BusinessConstants.MARKS_55_PER

    # Entry Check Point if DT_POR_FROM_CUTOFF <= dt_por <= DT_POR_TO_CUTOFF
    if DT_POR_FROM_CUTOFF <= dt_pg_por <= DT_POR_TO_CUTOFF:
        log.info("%s: Step 1 - POR Date within CutOff Date",
                 pg_validity_check_sc_criteria)

        if str(str_caste) == BusinessConstants.SC_CATEGORY:
            log.info("pgCalc_55MarksforOCnGT : Step 2 - SC Category Check")

            percentileToBeConsidered = BusinessConstants.MARKS_50_PER

        diffAbledCheck = pg_diffAbCheck(bool_diffAbled, float_pgMarks,
                                        str_caste, percentileToBeConsidered, pg_validity_check_sc_criteria)

        if (diffAbledCheck == True):
            log.info("%s: Step 1 - POR Date within CutOff Date",
                     pg_validity_check_sc_criteria)
            toConsider = True
            response = "pg_validity_check_sc_criteria : Step1 - PG with SC criteria validity check passed"

    else:
        response = "pg_validity_check_sc_criteria : Step 2 - PG + SC Checks Failed - Dont Consider This Date "

    return toConsider, response


"""
Function to convert True or False to Bool
"""


def str2bool(v):
    return v.lower() in ("yes", "True", "true", 't', "1")


"""This method is used get the PG with 50% marks and above

Name : calc_mphil_bfr31121993_phd_bfr31121993
Parameters :
-----------

   dt_pg_por - date of publication of PG results
   dt_mhil_por - date of publication of Mphil results
   dt_phd_por - date of publication of PHD results
   dt_net_por - date of publication of NET results
   dt_slet_por - date of publication of SLET results

   bool_chk1 - Whether applied Mphil Degree thru OU , CR , DE
   bool_chk2 - Whether applied PHD Degree thru OU , CR , DE

   str_caste - Caste Category
   float_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied

   bool_equivFlag1 - PG Degree Q5 Equivalence
   bool_equivFlag2 - PG Degree Q12 Equivalence (Foreign)

   str_sletNnetStatus - For Slet Net Status Check
   v_subjSlet - Slet Subject
   v_subjNet  - Net Subject

   v_subjHandled    - Subject handled
   v_subjApplied    - Subject Applied

"""
@svc_calc_mphil_bfr31121993_phd_bfr31121993.post(require_csrf=False)
def calc_mphil_bfr31121993_phd_bfr31121993(request):
    response = "Consider This Date"

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # Get the values from the request object
    dt_pg_por = datetime.strptime(request.POST.get(
        "dt_pg_por", 'No PG POR Date Recieved'), '%d/%m/%Y').date()

    str_caste = str(request.POST.get("str_caste", 'No Caste Info Recieved'))
    bool_diffAbled = str2bool(request.POST.get("bool_diffAbled", 'False'))
    float_pgMarks = request.POST.get("float_pgMarks", 'No PG Marks Recieved')

    str_subjHandledStatus = request.POST.get(
        "str_subjHandledStatus", "No Subject Handled  Status Info Recieved")

    v_subjHandled = request.POST.get(
        "v_subjHandled", "No Subject Handled Applied Info Recieved")  # Name of Subject Handled from DB.

    v_subjApplied = request.POST.get(
        "v_subjApplied", "No Subject Applied Info Recieved")  # Name of Post Applied  from DB.

    # Initiate PG Validity Check
    log.info(
        "------------------------------ PG Validity Check INITIATE ------------------------------")
    toConsider, response = pg_validity_check_mphil_calc(
        dt_pg_por, str_caste, float_pgMarks, bool_diffAbled, str_subjHandledStatus, v_subjHandled, v_subjApplied)

    print(toConsider)
    # Validate if the PG Check was True then proceed , else print status and exit here.
    log.info(
        "------------------------------ PG Validity Check COMPLETE ------------------------------")
    if(toConsider != True):
        log.info(
            "------------------------------ PG Validity Check FAILED , RETURNING RESPONSE ------------------------------")

        responseJson = {'Title':  'Mphil Completed Before 31.12.1993 / Submitted PHD before 31/12/1993 ( From Dt :19.09.1991 - To Date : 30.07.2002) ',
                        'Status': 'FAIL',
                        'Reason': response
                        }
        response = responseJson

        return response

    else:
        log.info(
            "------------------------------ PG Validity Check PASSED , MOVING FORWARD WITH MPHIL CHECKS ------------------------------")

        toConsider_2 = False
        mphil_sletNetCheck = False
        subjCheck_2equivCheck = False

        # TODO Move this to a config file or DB
        DT_TOP_POR_CUTOFF = datetime(1991, 9, 19).date()
        DT_BTM_POR_CUTOFF = datetime(2002, 7, 30).date()

        DT_GLB_POR_CUTOFF = datetime(
            1993, 12, 31).date()  # Global POR Cutoff Date

        # Get the rest of the POR dates from the request object

        str_dt_mphil_por = request.POST.get(
            "dt_mphil_por", 'NONE')

        str_dt_phd_por = request.POST.get(
            "dt_phd_por", 'NONE')

        str_dt_slet_por = request.POST.get(
            "dt_slet_por", 'NONE')

        str_dt_net_por = request.POST.get(
            "dt_net_por", 'NONE')

        if(len(str_dt_mphil_por) != 0):
            dt_mphil_por = datetime.strptime(
                str_dt_mphil_por, '%d/%m/%Y').date()

        if(len(str_dt_phd_por) != 0):
            dt_phd_por = datetime.strptime(
                str_dt_phd_por, '%d/%m/%Y').date()

        dt_elp_fromDt = datetime.strptime(request.POST.get(
            "dt_elp_fromDt", 'From Date - Period Of Service'), '%d/%m/%Y').date()

        dt_elp_toDt = datetime.strptime(request.POST.get(
            "dt_elp_toDt", 'To Date - Period Of Service'), '%d/%m/%Y').date()

        bool_sletStatus = str2bool(request.POST.get(
            "bool_sletStatus", 'False'))

        bool_netStatus = str2bool(request.POST.get(
            "bool_netStatus", 'False'))

        v_subjSlet = request.POST.get(
            "v_subjSlet", 'No SLET Marks Recieved')
        v_subjNet = request.POST.get("v_subjNet", 'No NET Marks Recieved')

        bool_equivFlag1 = str2bool(request.POST.get(
            "bool_equivFlag1", 'False'))  # Equivalence Check 1
        bool_equivFlag2 = str2bool(request.POST.get(
            "bool_equivFlag2", 'False'))  # Equivalence Check 2

        v_equiv1Sub = request.POST.get(
            "v_equiv1Sub", 'Equivalence 1 Subject Not Recieved')  # Equivalence Check 1

        v_equiv2Sub = request.POST.get(
            "v_equiv2Sub", 'Equivalence 2 Subject Not Recieved')  # Equivalence Check 1

        # MPHIL Degree From Recognized University
        bool_chk1 = str2bool(request.POST.get("bool_chk1", 'False'))
        # PHD Degree From Recognized University
        bool_chk2 = str2bool(request.POST.get("bool_chk1", 'False'))

        # PHD Validatity Check

        if dt_phd_por <= DT_GLB_POR_CUTOFF:
            if bool_chk2 != True:
                log.info("Step 5.1 - PG not from a Recognized University ")
                log.info("Step 5.2 -  Dont Consider This Date")

                response = {'Title':  'Mphil Completed Before 31.12.1993 / Submitted PHD before 31/12/1993 ( From Dt :19.09.1991 - To Date : 30.07.2002) ',
                            'Status': 'FAIL',
                            'Reason': 'PG not from a Recognized University - Dont Consider This Date'
                            }

            else:
                log.info("Step 5.4 - PG Check Passed ")
                log.info("Step 5.4 - PG from Recognized University ")
                log.info(
                    "Step 5.5 - Moving to 2 Equivalence Check ")

            subjCheck_2equivCheck = pg_subjCheck_2equiv(
                str_subjHandledStatus, v_subjHandled, bool_equivFlag1, v_equiv1Sub, bool_equivFlag2, v_equiv2Sub, calc_mphil_bfr31121993_phd_bfr31121993)

        else:
            log.info("Step 5.4 - PG NOT WITHIN CUTOFF DATE")
            log.info("Step 5.5 -  Dont Consider This Date")

            response = {'Title':  'Mphil Completed Before 31.12.1993 / Submitted PHD before 31/12/1993 ( From Dt :19.09.1991 - To Date : 30.07.2002) ',
                        'Status': 'FAIL',
                        'Reason': 'PG NOT WITHIN CUTOFF DATE - Dont Consider This Date '
                        }

        # MPHIL VALIDITY CHECK

        if dt_mphil_por <= DT_GLB_POR_CUTOFF:
            if bool_chk1 != True:
                log.info("Step 5.7 - MPHIL NOT  FROM RECOGNIZED UNIVERSITY ")
                log.info("Step 5.2 -  Dont Consider This Date")
                response = {'Title':  'Mphil Completed Before 31.12.1993 / Submitted PHD before 31/12/1993 ( From Dt :19.09.1991 - To Date : 30.07.2002) ',
                            'Status': 'FAIL',
                            'Reason': 'MPHIL not from a Recognized University - Dont Consider This Date '
                            }

            else:
                log.info("Step 5.9 - MPHIL Check Passed ")
                log.info("Step 5.10 - MPHIL from Recognized University ")
                log.info(
                    "Step 5.11 - Moving to SLET / NET & Subject Handled Check ")

            mphil_sletNetCheck = pg_sletNnet(
                bool_sletStatus, bool_netStatus, v_subjSlet, v_subjNet, v_subjHandled, bool_equivFlag1, bool_equivFlag2, calc_mphil_bfr31121993_phd_bfr31121993)

        else:
            log.info("Step 5.12 - MPHIL NOT WITHIN CUTOFF DATE")
            log.info("Step 5.13 -  Dont Consider This Date")

            response = {'Title':  'Mphil Completed Before 31.12.1993 / Submitted PHD before 31/12/1993 ( From Dt :19.09.1991 - To Date : 30.07.2002) ',
                        'Status': 'FAIL',
                        'Reason': 'MPHIL NOT WITHIN CUTOFF DATE - Dont Consider This Date '
                        }

        # PG + PHD ( within PG % LIMIT & PHD DATE LIMIT CONDITION)
        # PG + PHD + MPHIL Checks
        # PG + PHD + NET / SLET + MPHIL
        # PG + MPHIL + NET / SLET
        # All the above conditions are considered in the below statement
        if subjCheck_2equivCheck == True or mphil_sletNetCheck == True:

            # response = "Step 5.15 - PHD MATCHED or MPHIL MATCHED - Consider This Date "

            if(len(str_dt_slet_por) != 0):
                dt_slet_por = datetime.strptime(
                    str_dt_slet_por, '%d/%m/%Y').date()
                dt_earliestFrom = dt_slet_por
            if(len(str_dt_net_por) != 0):
                dt_net_por = datetime.strptime(
                    str_dt_net_por, '%d/%m/%Y').date()
                dt_earliestFrom = dt_net_por

            if(len(str_dt_slet_por) == 0 and len(str_dt_net_por) == 0):
                log.info(
                    "pgCalc_55MarksforOCnGT : Step 5 - SLET & NET DATE ARE EMPTY  ")
                log.info(
                    "pgCalc_55MarksforOCnGT : Step 5.1 - Dont Consider This Date")

                response = {'Title':  'Mphil Completed Before 31.12.1993 / Submitted PHD before 31/12/1993 ( From Dt :19.09.1991 - To Date : 30.07.2002)',
                            'Status': 'FAIL',
                            'Reason': 'POR SLET & POR NET DATES ARE EMPTY - Dont Consider This Date'
                            }
            if(len(str_dt_slet_por) != 0 and len(str_dt_net_por) != 0):

                # find the smallest of the 4 dates to give the benefit to the candidate
                dt_earliestFrom = min(dt_mphil_por, dt_phd_por,
                                      dt_slet_por, dt_net_por)

                diff = relativedelta.relativedelta(
                    DT_BTM_POR_CUTOFF, dt_earliestFrom)

                dt_diff_response = str(diff.years) + " Years and " + \
                    str(diff.months) + " Months and " + \
                    str(diff.days) + " Days"

                response = {'Title':  'Mphil Completed Before 31.12.1993 / Submitted PHD before 31/12/1993 ( From Dt :19.09.1991 - To Date : 30.07.2002)',
                            'Status': 'PASS',
                            'Eligible From Date': str(dt_earliestFrom),
                            'Eligible To Date': str(DT_BTM_POR_CUTOFF),
                            'Date Difference ': dt_diff_response,
                            'Subject Handled ': v_subjHandled}

        return response


"""This method is used get the PG with 50% marks and above

Name : calc_pgNmphil_bfr14062006_aftr29062010
Parameters :
-----------

   dt_pg_por - date of publication of PG results
   dt_mhil_por - date of publication of Mphil results
   dt_phd_por - date of publication of PHD results
   dt_net_por - date of publication of NET results
   dt_slet_por - date of publication of SLET results

   bool_chk1 - Whether applied Mphil Degree thru OU , CR , DE
   bool_chk2 - Whether applied PHD Degree thru OU , CR , DE

   str_caste - Caste Category
   float_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied

   bool_equivFlag1 - PG Degree Q5 Equivalence
   bool_equivFlag2 - PG Degree Q12 Equivalence (Foreign)

   str_sletNnetStatus - For Slet Net Status Check
   v_subjSlet - Slet Subject
   v_subjNet  - Net Subject

   v_subjHandled    - Subject handled
   v_subjApplied    - Subject Applied

"""
@svc_calc_pgNmphil_bfr14062006_aftr29062010.post(require_csrf=False)
def calc_pgNmphil_bfr14062006_aftr29062010(request):
    response = "Consider This Date"

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # Get the values from the request object
    dt_pg_por = datetime.strptime(request.POST.get(
        "dt_pg_por", 'No PG POR Date Recieved'), '%d/%m/%Y').date()

    str_caste = str(request.POST.get("str_caste", 'No Caste Info Recieved'))
    bool_diffAbled = str2bool(request.POST.get("bool_diffAbled", 'False'))
    float_pgMarks = request.POST.get("float_pgMarks", 'No PG Marks Recieved')

    str_subjHandledStatus = request.POST.get(
        "str_subjHandledStatus", "No Subject Handled  Status Info Recieved")

    v_subjHandled = request.POST.get(
        "v_subjHandled", "No Subject Handled Applied Info Recieved")  # Name of Subject Handled from DB.

    v_subjApplied = request.POST.get(
        "v_subjApplied", "No Subject Applied Info Recieved")  # Name of Post Applied  from DB.

    # Initiate PG Validity Check
    log.info(
        "------------------------------ PG + SC Validity Check INITIATE ------------------------------")
    toConsider, response = pg_validity_check_sc_criteria(
        dt_pg_por, str_caste, float_pgMarks, bool_diffAbled, str_subjHandledStatus, v_subjHandled, v_subjApplied)

    print(toConsider)
    # Validate if the PG Check was True then proceed , else print status and exit here.
    log.info(
        "------------------------------ PG Validity Check COMPLETE ------------------------------")
    if(toConsider != True):
        log.info(
            "------------------------------ PG Validity Check FAILED , RETURNING RESPONSE ------------------------------")
        response = {'Title':  'PG with MPHIL ( From Dt :14.06.2006 - To Date : 29.06.2010)',
                    'Status': 'FAIL',
                    'Reason': response
                    }

        return response

    else:
        log.info(
            "------------------------------ PG Validity Check PASSED , MOVING FORWARD WITH MPHIL CHECKS ------------------------------")

        toConsider_2 = False
        mphil_sletNetCheck = False
        subjCheck_2equivCheck = False

        # TODO Move this to a config file or DB
        DT_TOP_POR_CUTOFF = datetime(2006, 6, 14).date()
        DT_BTM_POR_CUTOFF = datetime(2010, 6, 29).date()
        DT_GLB_POR_CUTOFF = datetime(
            1993, 12, 31).date()  # Global POR Cutoff Date

        str_dt_mphil_por = request.POST.get(
            "dt_mphil_por", 'NONE')

        str_dt_phd_por = request.POST.get(
            "dt_phd_por", 'NONE')

        str_dt_slet_por = request.POST.get(
            "dt_slet_por", 'NONE')

        str_dt_net_por = request.POST.get(
            "dt_net_por", 'NONE')

        if(len(str_dt_mphil_por) != 0):
            dt_mphil_por = datetime.strptime(
                str_dt_mphil_por, '%d/%m/%Y').date()

        if(len(str_dt_phd_por) != 0):
            dt_phd_por = datetime.strptime(
                str_dt_phd_por, '%d/%m/%Y').date()

        if(len(str_dt_slet_por) != 0):
            dt_slet_por = datetime.strptime(
                str_dt_slet_por, '%d/%m/%Y').date()
            dt_earliestFrom = dt_slet_por
        if(len(str_dt_net_por) != 0):
            dt_net_por = datetime.strptime(
                str_dt_net_por, '%d/%m/%Y').date()
            dt_earliestFrom = dt_net_por

        # Get the rest of the POR dates from the request object

        dt_elp_fromDt = datetime.strptime(request.POST.get(
            "dt_elp_fromDt", 'From Date - Period Of Service'), '%d/%m/%Y').date()

        dt_elp_toDt = datetime.strptime(request.POST.get(
            "dt_elp_toDt", 'To Date - Period Of Service'), '%d/%m/%Y').date()

        bool_sletStatus = str2bool(str(request.POST.get(
            "bool_sletStatus", 'False')))

        bool_netStatus = str2bool(
            str(request.POST.get("bool_netStatus", 'False')))

        v_subjSlet = request.POST.get(
            "v_subjSlet", 'No SLET Marks Recieved')
        v_subjNet = request.POST.get("v_subjNet", 'No NET Marks Recieved')

        bool_equivFlag1 = str2bool(request.POST.get(
            "bool_equivFlag1", 'False'))  # Equivalence Check 1
        bool_equivFlag2 = str2bool(request.POST.get(
            "bool_equivFlag2", 'False'))  # Equivalence Check 2

        v_equiv1Sub = request.POST.get(
            "v_equiv1Sub", 'Equivalence 1 Subject Not Recieved')  # Equivalence Check 1

        v_equiv2Sub = request.POST.get(
            "v_equiv2Sub", 'Equivalence 2 Subject Not Recieved')  # Equivalence Check 1

        # MPHIL Degree From Recognized University
        bool_chk1 = str2bool(request.POST.get("bool_chk1", 'False'))
        # PHD Degree From Recognized University
        bool_chk2 = str2bool(request.POST.get("bool_chk1", 'False'))

        # PHD Validatity Check

        if dt_phd_por <= DT_GLB_POR_CUTOFF:
            if bool_chk2 != True:
                log.info("Step 5.1 - PG not from a Recognized University ")
                log.info("Step 5.2 -  Dont Consider This Date")

                response = {'Title':  'PG with MPHIL ( From Dt :14.06.2006 - To Date : 29.06.2010)',
                            'Status': 'FAIL',
                            'Reason': 'Step 5.3 - PG not from a Recognized University - Dont Consider This Date'
                            }
            else:
                log.info("Step 5.4 - PG Check Passed ")
                log.info("Step 5.4 - PG from Recognized University ")
                log.info(
                    "Step 5.5 - Moving to 2 Equivalence Check ")

            subjCheck_2equivCheck = pg_subjCheck_2equiv(
                str_subjHandledStatus, v_subjHandled, bool_equivFlag1, v_equiv1Sub, bool_equivFlag2, v_equiv2Sub, calc_pgNmphil_bfr14062006_aftr29062010)

        else:
            log.info("Step 5.4 - PG NOT WITHIN CUTOFF DATE")
            log.info("Step 5.5 -  Dont Consider This Date")

            response = {'Title':  'PG with MPHIL ( From Dt :14.06.2006 - To Date : 29.06.2010)',
                        'Status': 'FAIL',
                        'Reason': 'Step 5.6 - PG NOT WITHIN CUTOFF DATE - Dont Consider This Date '
                        }

        # MPHIL VALIDITY CHECK

        if dt_mphil_por <= DT_GLB_POR_CUTOFF:
            if bool_chk1 != True:
                log.info("Step 5.7 - MPHIL NOT  FROM RECOGNIZED UNIVERSITY ")
                log.info("Step 5.2 -  Dont Consider This Date")

                response = {'Title':  'PG with MPHIL ( From Dt :14.06.2006 - To Date : 29.06.2010)',
                            'Status': 'FAIL',
                            'Reason': 'MPHIL not from a Recognized University - Dont Consider This Date'
                            }

            else:
                log.info("Step 5.9 - MPHIL Check Passed ")
                log.info("Step 5.10 - MPHIL from Recognized University ")
                log.info(
                    "Step 5.11 - Moving to SLET / NET & Subject Handled Check ")

            mphil_sletNetCheck = pg_sletNnet(
                sletStatus, netStatus, v_subjSlet, v_subjNet, v_subjHandled, bool_equivFlag1, bool_equivFlag2, calc_pgNmphil_bfr14062006_aftr29062010)

        else:
            log.info("Step 5.12 - MPHIL NOT WITHIN CUTOFF DATE")
            log.info("Step 5.13 -  Dont Consider This Date")

            response = {'Title':  'PG with MPHIL ( From Dt :14.06.2006 - To Date : 29.06.2010)',
                        'Status': 'FAIL',
                        'Reason': 'Step 5.14 - MPHIL NOT WITHIN CUTOFF DATE - Dont Consider This Date'
                        }

        # PG + PHD ( within PG % LIMIT & PHD DATE LIMIT CONDITION)
        # PG + PHD + MPHIL Checks
        # PG + PHD + NET / SLET + MPHIL
        # PG + MPHIL + NET / SLET
        # All the above conditions are considered in the below statement
        if subjCheck_2equivCheck == True or mphil_sletNetCheck == True:
            # response = "Step 5.15 - PHD MATCHED or MPHIL MATCHED - Consider This Date "

            if(len(str_dt_slet_por) != 0):
                dt_slet_por = datetime.strptime(
                    str_dt_slet_por, '%d/%m/%Y').date()
                dt_earliestFrom_1 = dt_slet_por
            if(len(str_dt_net_por) != 0):
                dt_net_por = datetime.strptime(
                    str_dt_net_por, '%d/%m/%Y').date()
                dt_earliestFrom_1 = dt_net_por

            if(len(str_dt_slet_por) == 0 and len(str_dt_net_por) == 0):
                log.info(
                    "pgCalc_55MarksforOCnGT : Step 5 - SLET & NET DATE ARE EMPTY  ")
                log.info(
                    "pgCalc_55MarksforOCnGT : Step 5.1 - Dont Consider This Date")

                response = {'Title':  'PG with MPHIL ( From Dt :14.06.2006 - To Date : 29.06.2010)',
                            'Status': 'FAIL',
                            'Reason': 'POR SLET & POR NET DATES ARE EMPTY - Dont Consider This Date'
                            }
            if(len(str_dt_slet_por) != 0 and len(str_dt_net_por) != 0):

                # find the smallest of the 4 dates to give the benefit to the candidate
                dt_earliestFrom = min(dt_mphil_por, dt_phd_por,
                                      dt_slet_por, dt_net_por)
            else:
                # find the smallest of the 4 dates to give the benefit to the candidate
                dt_earliestFrom = min(dt_mphil_por, dt_phd_por,
                                      dt_earliestFrom_1)

                diff = relativedelta.relativedelta(
                    DT_BTM_POR_CUTOFF, dt_earliestFrom)

                dt_diff_response = str(diff.years) + " Years and " + \
                    str(diff.months) + " Months and " + \
                    str(diff.days) + " Days"

                response = {'Title':  'PG with MPHIL ( From Dt :14.06.2006 - To Date : 29.06.2010)',
                            'Status': 'PASS',
                            'Eligible From Date': str(dt_earliestFrom),
                            'Eligible To Date': str(DT_BTM_POR_CUTOFF),
                            'Date Difference ': dt_diff_response,
                            'Subject Handled ': v_subjHandled}

        return response


"""This method is used get the PG & MPHIL thru CR / OU / DE with 50% marks and above

Name : calc_pgNmphil_CROUDE_bfr14062006_aftr242009
Parameters :
-----------

   dt_pg_por - date of publication of PG results
   dt_mhil_por - date of publication of Mphil results
   dt_phd_por - date of publication of PHD results
   dt_net_por - date of publication of NET results
   dt_slet_por - date of publication of SLET results

   bool_chk1 - Whether applied Mphil Degree thru OU , CR , DE
   bool_chk2 - Whether applied PHD Degree thru OU , CR , DE

   str_caste - Caste Category
   float_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied

   bool_equivFlag1 - PG Degree Q5 Equivalence
   bool_equivFlag2 - PG Degree Q12 Equivalence (Foreign)

   str_sletNnetStatus - For Slet Net Status Check
   v_subjSlet - Slet Subject
   v_subjNet  - Net Subject

   v_subjHandled    - Subject handled
   v_subjApplied    - Subject Applied

"""
@svc_calc_pgNmphil_CROUDE_bfr14062006_aftr242009.post(require_csrf=False)
def calc_pgNmphil_CROUDE_bfr14062006_aftr242009(request):
    response = "Consider This Date"

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # Get the values from the request object
    dt_pg_por = datetime.strptime(request.POST.get(
        "dt_pg_por", 'No PG POR Date Recieved'), '%d/%m/%Y').date()

    str_caste = str(request.POST.get("str_caste", 'No Caste Info Recieved'))
    bool_diffAbled = str2bool(request.POST.get("bool_diffAbled", 'False'))
    float_pgMarks = request.POST.get("float_pgMarks", 'No PG Marks Recieved')

    str_subjHandledStatus = request.POST.get(
        "str_subjHandledStatus", "No Subject Handled  Status Info Recieved")

    v_subjHandled = request.POST.get(
        "v_subjHandled", "No Subject Handled Applied Info Recieved")  # Name of Subject Handled from DB.

    v_subjApplied = request.POST.get(
        "v_subjApplied", "No Subject Applied Info Recieved")  # Name of Post Applied  from DB.

    # Initiate PG Validity Check
    log.info(
        "------------------------------ PG + SC Validity Check INITIATE ------------------------------")
    toConsider, response = pg_validity_check_sc_criteria(
        dt_pg_por, str_caste, float_pgMarks, bool_diffAbled, str_subjHandledStatus, v_subjHandled, v_subjApplied)

    print(toConsider)
    # Validate if the PG Check was True then proceed , else print status and exit here.
    log.info(
        "------------------------------ PG Validity Check COMPLETE ------------------------------")
    if(toConsider != True):
        log.info(
            "------------------------------ PG Validity Check FAILED , RETURNING RESPONSE ------------------------------")
        response = {'Title':  'PG with MPHIL thru CR/DE/OU ( From Dt :14.06.2006 - To Date : 02.04.2009)',
                    'Status': 'FAIL',
                    'Reason': response
                    }

        return response

    else:
        log.info(
            "------------------------------ PG Validity Check PASSED , MOVING FORWARD WITH MPHIL CHECKS ------------------------------")

        toConsider_2 = False
        mphil_sletNetCheck = False
        subjCheck_2equivCheck = False

        # TODO Move this to a config file or DB
        DT_TOP_POR_CUTOFF = datetime(2006, 6, 14).date()
        DT_BTM_POR_CUTOFF = datetime(2009, 4, 2).date()
        DT_GLB_POR_CUTOFF = datetime(
            1993, 12, 31).date()  # Global POR Cutoff Date

        # Get the rest of the POR dates from the request object

        dt_mphil_por = datetime.strptime(request.POST.get(
            "dt_mphil_por", 'No MHIL POR Date Recieved'), '%d/%m/%Y').date()

        dt_phd_por = datetime.strptime(request.POST.get(
            "dt_phd_por", 'No PHD POR Date Recieved'), '%d/%m/%Y').date()

        dt_net_por = datetime.strptime(request.POST.get(
            "dt_net_por", 'No NET POR Date Recieved'), '%d/%m/%Y').date()

        dt_slet_por = datetime.strptime(request.POST.get(
            "dt_slet_por", 'No SLET POR Date Recieved'), '%d/%m/%Y').date()

        dt_elp_fromDt = datetime.strptime(request.POST.get(
            "dt_elp_fromDt", 'From Date - Period Of Service'), '%d/%m/%Y').date()

        dt_elp_toDt = datetime.strptime(request.POST.get(
            "dt_elp_toDt", 'To Date - Period Of Service'), '%d/%m/%Y').date()

        sletStatus = str2bool(request.POST.get(
            "SLET_STATUS", 'False'))

        netStatus = str2bool(request.POST.get(
            "NET_STATUS", 'False'))

        v_subjSlet = request.POST.get(
            "v_subjSlet", 'No SLET Marks Recieved')
        v_subjNet = request.POST.get("v_subjNet", 'No NET Marks Recieved')

        bool_equivFlag1 = str2bool(request.POST.get(
            "bool_equivFlag1", 'False'))  # Equivalence Check 1
        bool_equivFlag2 = str2bool(request.POST.get(
            "bool_equivFlag2", 'False'))  # Equivalence Check 2

        v_equiv1Sub = request.POST.get(
            "v_equiv1Sub", 'Equivalence 1 Subject Not Recieved')  # Equivalence Check 1

        v_equiv2Sub = request.POST.get(
            "v_equiv2Sub", 'Equivalence 2 Subject Not Recieved')  # Equivalence Check 1

        # MPHIL Degree From Recognized University
        bool_chk1 = str2bool(request.POST.get("bool_chk1", 'false'))
        # PHD Degree From Recognized University
        bool_chk2 = str2bool(request.POST.get("bool_chk1", 'false'))

        # PHD Validatity Check

        if dt_phd_por <= DT_GLB_POR_CUTOFF:
            if bool_chk2 != True:
                log.info("Step 5.1 - PG not from a Recognized University ")
                log.info("Step 5.2 -  Dont Consider This Date")
                response = "Step 5.3 - PG not from a Recognized University - Dont Consider This Date "
                response = {'Title':  'PG with MPHIL thru CR/DE/OU ( From Dt :14.06.2006 - To Date : 02.04.2009)',
                            'Status': 'FAIL',
                            'Reason': response
                            }

            else:
                log.info("Step 5.4 - PG Check Passed ")
                log.info("Step 5.4 - PG from Recognized University ")
                log.info(
                    "Step 5.5 - Moving to 2 Equivalence Check ")

            subjCheck_2equivCheck = pg_subjCheck_2equiv(
                str_subjHandledStatus, v_subjHandled, bool_equivFlag1, v_equiv1Sub, bool_equivFlag2, v_equiv2Sub, calc_pgNmphil_CROUDE_bfr14062006_aftr29062010)

        else:
            log.info("Step 5.4 - PG NOT WITHIN CUTOFF DATE")
            log.info("Step 5.5 -  Dont Consider This Date")

            response = "Step 5.6 - PG NOT WITHIN CUTOFF DATE - Dont Consider This Date "

            response = {'Title':  'PG with MPHIL thru CR/DE/OU ( From Dt :14.06.2006 - To Date : 02.04.2009)',
                        'Status': 'FAIL',
                        'Reason': response
                        }

        # MPHIL VALIDITY CHECK

        if dt_mphil_por <= DT_GLB_POR_CUTOFF:
            if bool_chk1 != True:
                log.info("Step 5.7 - MPHIL NOT  FROM RECOGNIZED UNIVERSITY ")
                log.info("Step 5.2 -  Dont Consider This Date")
                response = "Step 5.8 - MPHIL not from a Recognized University - Dont Consider This Date "

                response = {'Title':  'PG with MPHIL thru CR/DE/OU ( From Dt :14.06.2006 - To Date : 02.04.2009)',
                            'Status': 'FAIL',
                            'Reason': response
                            }

            else:
                log.info("Step 5.9 - MPHIL Check Passed ")
                log.info("Step 5.10 - MPHIL from Recognized University ")
                log.info(
                    "Step 5.11 - Moving to SLET / NET & Subject Handled Check ")

            mphil_sletNetCheck = pg_sletNnet(
                sletStatus, netStatus, v_subjSlet, v_subjNet, v_subjHandled, bool_equivFlag1, bool_equivFlag2, calc_pgNmphil_CROUDE_bfr14062006_aftr29062010)

        else:
            log.info("Step 5.12 - MPHIL NOT WITHIN CUTOFF DATE")
            log.info("Step 5.13 -  Dont Consider This Date")

            response = "Step 5.14 - MPHIL NOT WITHIN CUTOFF DATE - Dont Consider This Date "
            response = {'Title':  'PG with MPHIL thru CR/DE/OU ( From Dt :14.06.2006 - To Date : 02.04.2009)',
                        'Status': 'FAIL',
                        'Reason': response
                        }

        # PG + PHD ( within PG % LIMIT & PHD DATE LIMIT CONDITION)
        # PG + PHD + MPHIL Checks
        # PG + PHD + NET / SLET + MPHIL
        # PG + MPHIL + NET / SLET
        # All the above conditions are considered in the below statement
        if subjCheck_2equivCheck == True or mphil_sletNetCheck == True:
            # response = "Step 5.15 - PHD MATCHED or MPHIL MATCHED - Consider This Date "

            # find the smallest of the 4 dates to give the benefit to the candidate
            dt_earliestFrom = min(dt_mphil_por, dt_phd_por,
                                  dt_slet_por, dt_net_por)

            diff = relativedelta.relativedelta(
                DT_BTM_POR_CUTOFF, dt_earliestFrom)

            dt_diff_response = str(diff.years) + " Years and " + \
                str(diff.months) + " Months and " + str(diff.days) + " Days"

            response = {'Title':  'Mphil Completed Before 31.12.1993 / Submitted PHD before 31/12/1993 ( From Dt :19.09.1991 - To Date : 30.07.2002)',
                        'Status': 'PASS',
                        'Eligible From Date': str(dt_earliestFrom),
                        'Eligible To Date': str(DT_BTM_POR_CUTOFF),
                        'Date Difference ': dt_diff_response,
                        'Subject Handled ': v_subjHandled}

        return response
