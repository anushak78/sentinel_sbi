import logging
import datetime

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

svc_pgCalc_50mNabove_Upto1891991 = Service(
    name="biz.api.scores.pgCalc_50mNabove_Upto1891991", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/pgCalc_50mNabove_Upto1891991", cors_policy=cors.POLICY)


svc_pgCalc_55MarksforOCnGT_19091991_17072018 = Service(
    name="biz.api.scores.pgCalc_55MarksforOCnGT_19091991_17072018", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/pgCalc_55MarksforOCnGT_19091991_17072018", cors_policy=cors.POLICY)

svc_pgCalc_55MarksforNonOC_18072018_04102019 = Service(
    name="biz.api.scores.pgCalc_55MarksforNonOC_18072018_04102019", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/pgCalc_55MarksforNonOC_18072018_04102019", cors_policy=cors.POLICY)

svc_phdCalc_submtdbfr_31122002 = Service(
    name="biz.api.scores.phdCalc_submtdbfr_31122002", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/phdCalc_submtdbfr_31122002", cors_policy=cors.POLICY)


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


def pg_sletNnet(sletNnetStatus, v_subjSlet, v_subjNet, v_subjHandled, bool_equivFlag1, bool_equivFlag2, fnName):

    if (sletNnetStatus == BusinessConstants.NET_STATUS):
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

    elif (sletNnetStatus == BusinessConstants.SLET_STATUS):
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
int_pgMarks - PG Marks percentile
str_caste - Caste category
fnName - Function Name for Logging
"""


def pg_diffAbCheck(bool_diffAbled, int_pgMarks, str_caste, cutOffConsidered, fnName):
    if(bool_diffAbled == True):
        log.info("%s - Step 3 - Candidate in Differently Abled Category", fnName)

        if(int(int_pgMarks) >= BusinessConstants.MARKS_50_PER):
            log.info("%s - Step 3.1 - >= 50% Marks Pass", fnName)
            log.info("%s - Step 3.2 - Consider this Date", fnName)
            return True

        else:
            log.info("%s - Step 3.3 - 50% Marks Failed", fnName)
            log.info("%s - Step 3.4 -  Dont Consider This Date", fnName)
            return False
    else:
        log.info("%s - Step 4 - Candidate Fit & Abled", fnName)

        if(int(int_pgMarks) >= cutOffConsidered):
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
"""


def pg_subjCheck(str_subjHandledStatus, v_subjHandled, v_subjApplied, fnName):

    if (int(str_subjHandledStatus) == BusinessConstants.MATCHED):
        log.info("%s - Step 4.2.1 - Subject Handled matches", fnName)

        if(str(v_subjHandled) == str(v_subjApplied)):
            log.info(
                "%s - Step 4.2.2 - Subject Handled Matches Subject Applied ", fnName)
            log.info("%s - Step 4.2.3 - Consider This Date", fnName)
            return True
        else:
            log.info("%s - Step 4.2.4 - Post Applied does not match", fnName)
            log.info("%s - Step 4.2.5 - Dont Consider this Date", fnName)
            return False
    else:
        log.info("%s - Step 4.2.6 - Subject Handled does not match", fnName)
        log.info("%s - Step 4.2.7 - Dont Consider this date", fnName)
        return False


"""This method is used get the PG with 50% marks and above

Name : pgCalc_50mNabove_Upto1891991
Parameters :
-----------

   dt_por - date of publication of results
   str_caste - Caste Category
   int_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""
@svc_pgCalc_50mNabove_Upto1891991.post(require_csrf=False)
def pgCalc_50mNabove_Upto1891991(request):
    response = "Consider This Date"

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # TODO Move this to a config file or DB
    DT_POR_CUTOFF = datetime.datetime(1991, 9, 18).date()

    # Get the values from the request object
    dt_pg_por = datetime.datetime.strptime(request.POST.get(
        "dt_pg_por", 'No POR Date Recieved'), '%d/%m/%Y').date()

    dt_elp_fromDt = datetime.datetime.strptime(request.POST.get(
        "dt_elp_fromDt", 'From Date - Period Of Service'), '%d/%m/%Y').date()

    dt_elp_toDt = datetime.datetime.strptime(request.POST.get(
        "dt_elp_toDt", 'To Date - Period Of Service'), '%d/%m/%Y').date()

    str_caste = str(request.POST.get("str_caste", 'No Caste Info Recieved'))
    bool_diffAbled = request.POST.get("bool_diffAbled", 'false')
    int_pgMarks = request.POST.get("int_pgMarks", 'No PG Marks Recieved')

    str_subjHandledStatus = request.POST.get(
        "str_subjHandledStatus", "No Subject Handled  Status Info Recieved")

    v_subjHandled = request.POST.get(
        "v_subjHandled", "No Subject Handled Applied Info Recieved")  # Name of Subject Handled from DB.

    v_subjectApplied = request.POST.get(
        "v_subjApplied", "No Subject Applied Info Recieved")  # Name of Post Applied  from DB.

    # Entry Check Point if POR < CUT OFF DATE
    if dt_pg_por <= DT_POR_CUTOFF:
        log.info("Step 1 - POR Date within CutOff Date")

        if str_caste == BusinessConstants.OC_CATEGORY:
            log.info("Step 2 - Candidate in OC Category")

            if(bool_diffAbled == True):
                log.info("Step 3 - Candidate in Differently Abled Category")

                if(int(int_pgMarks) >= BusinessConstants.MARKS_50_PER):
                    log.info("Step 3.1 - >= 50% Marks Pass")
                    log.info("Step 3.2 - Consider this Date")
                    toConsider = pg_subjCheck(str_subjHandledStatus,
                                              v_subjHandled, v_subjectApplied, pgCalc_50mNabove_Upto1891991)
                else:
                    log.info("Step 3.3 - 50% Marks Failed")
                    log.info("Step 3.4 -  Dont Consider This Date")

                    response = "Step 3.3 - 50% Marks Failed - Dont Consider This Date "

            else:
                log.info("Step 4 - Candidate Fit & Abled")

                if(int(int_pgMarks) >= BusinessConstants.MARKS_55_PER):
                    log.info("Step 4.1 - >= 55% Marks Pass")
                    log.info("Step 4.2 -  Consider this Date")
                    toConsider = pg_subjCheck(str_subjHandledStatus,
                                              v_subjHandled, v_subjectApplied, pgCalc_50mNabove_Upto1891991)

                    if(toConsider != True):
                        response = " Step 4.3 - All Checks Failed - Dont Consider This Date"

                else:
                    log.info("Step 4.4 - 55% Marks Failed ")
                    log.info("Step 4.5 -  Dont Consider This Date")
                    response = "Step 4.6 - 55% Marks Failed - Dont Consider This Date"

        elif str_caste == BusinessConstants.OC_OTHER_STATE:
            log.info("Step 4.7 - Candidate in OC Other State Category")
            toConsider = pg_subjCheck(str_subjHandledStatus,
                                      v_subjHandled, v_subjectApplied, pgCalc_50mNabove_Upto1891991)
            if(toConsider != True):
                response = " Step 4.8 - All Checks Failed - Dont Consider This Date"

    else:
        log.info("Step 4.9 - All Checks Failed ")
        log.info("Step 4.10 - Dont Consider This Date")
        response = " Step 4.11 - All Checks Failed - Dont Consider This Date "

    print(toConsider)
    if(toConsider == True):
        response = str(dt_elp_toDt - dt_elp_fromDt)

    return response


"""This method is used get the PG with 55% marks for GC / GT (NET/SLET/ CISR) 
for SC / SCA / ST / Diff Abled (50% marks)

Name : pgCalc_55MarksforOCnGT_19091991_17072018
Parameters :
-----------

   dt_por - date of publication of results
   str_caste - Caste Category
   int_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""


@svc_pgCalc_55MarksforOCnGT_19091991_17072018.post(require_csrf=False)
def pgCalc_55MarksforOCnGT_19091991_17072018(request):
    response = "Hello 55 Marks for OC /GT "

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # TODO Move this to a config file or DB
    DT_POR_FROM_CUTOFF = datetime.datetime(1991, 9, 19).date()
    DT_POR_TO_CUTOFF = datetime.datetime(2018, 7, 17).date()

    # Get the values from the request object
    dt_pg_por = datetime.datetime.strptime(request.POST.get(
        "dt_pg_por", 'No POR Date Recieved'), '%d/%m/%Y').date()

    dt_elp_fromDt = datetime.datetime.strptime(request.POST.get(
        "dt_elp_fromDt", 'No From Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    dt_elp_toDt = datetime.datetime.strptime(request.POST.get(
        "dt_elp_toDt", 'No To Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    str_caste = str(request.POST.get("str_caste", 'No Caste Info Recieved'))
    bool_diffAbled = request.POST.get("bool_diffAbled", 'false')
    int_pgMarks = request.POST.get("int_pgMarks", 'No PG Marks Recieved')

    # Special Marks Override to be considered for SC Category
    percentileToBeConsidered = BusinessConstants.MARKS_55_PER

    # Entry Check Point if DT_POR_FROM_CUTOFF <= dt_por <= DT_POR_TO_CUTOFF
    if DT_POR_FROM_CUTOFF <= dt_pg_por <= DT_POR_TO_CUTOFF:
        log.info("%s: Step 1 - POR Date within CutOff Date",
                 pgCalc_55MarksforOCnGT_19091991_17072018)

        if str(str_caste) == BusinessConstants.SC_CATEGORY:
            log.info("pgCalc_55MarksforOCnGT : Step 2 - SC Category Check")
            percentileToBeConsidered = BusinessConstants.MARKS_50_PER

        diffAbledCheck = pg_diffAbCheck(bool_diffAbled, int_pgMarks,
                                        str_caste, percentileToBeConsidered, pgCalc_55MarksforOCnGT_19091991_17072018)

        if (diffAbledCheck == True):

            str_sletNnetStatus = str(request.POST.get(
                "str_sletNnetStatus", 'No Caste Info Recieved'))
            v_subjSlet = request.POST.get(
                "v_subjSlet", 'No SLET Marks Recieved')
            v_subjNet = request.POST.get("v_subjNet", 'No NET Marks Recieved')
            v_subjHandled = request.POST.get(
                "v_subjHandled", 'No Subject Handled Recieved')

            bool_equivFlag1 = False  # No Equivalence Check hence default Fault
            bool_equivFlag2 = False  # No Equivalence Check hence default Fault

            sletNetCheck = pg_sletNnet(
                str_sletNnetStatus, v_subjSlet, v_subjNet, v_subjHandled, bool_equivFlag1, bool_equivFlag1, pgCalc_55MarksforOCnGT_19091991_17072018)

            if(sletNetCheck == True):
                str_subjHandledStatus = request.POST.get(
                    "str_subjHandledStatus", "No Subject Handled  Status Info Recieved")

                v_subjHandled = request.POST.get(
                    "v_subjHandled", "No Subject Handled Applied Info Recieved")  # Name of Subject Handled from DB.

                v_subjApplied = request.POST.get(
                    "v_subjApplied", "No Subject Applied Info Recieved")  # Name of Post Applied  from DB.

                toConsider = pg_subjCheck(
                    str_subjHandledStatus, v_subjHandled, v_subjApplied, pgCalc_55MarksforOCnGT_19091991_17072018)

    if(toConsider == False):
        response = "pgCalc_55MarksforOCnGT : Step 3 - All Checks Failed - Dont Consider This Date "

    else:
        log.info("pgCalc_55MarksforOCnGT : Step 4 - All Checks Failed ")
        log.info("pgCalc_55MarksforOCnGT : Step 4.1 - Dont Consider This Date")
        response = "pgCalc_55MarksforOCnGT : Step 4.2 - All Checks Failed - Dont Consider This Date "

    print(toConsider)
    if(toConsider == True):
        response = str(dt_elp_toDt - dt_elp_fromDt)

    return response


"""This method is used get the PG with 55% marks for GC / GT (NET/SLET/ CISR) 
for SC / SCA / ST / Diff Abled (50% marks)

Name : pgCalc_55MarksforNonOC_18072018_04102019
Parameters :
-----------

   dt_por - date of publication of results
   str_caste - Caste Category
   int_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""


@svc_pgCalc_55MarksforNonOC_18072018_04102019.post(require_csrf=False)
def pgCalc_55MarksforNonOC_18072018_04102019(request):
    response = "Hello 55 Marks for OC /GT "

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # TODO Move this to a config file or DB
    DT_POR_FROM_CUTOFF = datetime.datetime(2018, 7, 18).date()
    DT_POR_TO_CUTOFF = datetime.datetime(2019, 10, 4).date()

    # Get the values from the request object
    dt_pg_por = datetime.datetime.strptime(request.POST.get(
        "dt_pg_por", 'No POR Date Recieved'), '%d/%m/%Y').date()

    dt_elp_fromDt = datetime.datetime.strptime(request.POST.get(
        "dt_elp_fromDt", 'No From Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    dt_elp_toDt = datetime.datetime.strptime(request.POST.get(
        "dt_elp_toDt", 'No To Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    str_caste = str(request.POST.get("str_caste", 'No Caste Info Recieved'))
    bool_diffAbled = request.POST.get("bool_diffAbled", 'false')
    int_pgMarks = request.POST.get("int_pgMarks", 'No PG Marks Recieved')

    # Special Marks Override to be considered for SC Category
    percentileToBeConsidered = BusinessConstants.MARKS_55_PER

    # Entry Check Point if DT_POR_FROM_CUTOFF <= dt_por <= DT_POR_TO_CUTOFF
    if DT_POR_FROM_CUTOFF <= dt_pg_por <= DT_POR_TO_CUTOFF:
        log.info("%s: Step 1 - POR Date within CutOff Date",
                 pgCalc_55MarksforNonOC_18072018_04102019)

        if str(str_caste) == BusinessConstants.SC_CATEGORY:
            log.info("pgCalc_55MarksforOCnGT : Step 2 - SC Category Check")
            percentileToBeConsidered = BusinessConstants.MARKS_50_PER

        diffAbledCheck = pg_diffAbCheck(bool_diffAbled, int_pgMarks,
                                        str_caste, percentileToBeConsidered, pgCalc_55MarksforNonOC_18072018_04102019)

        if (diffAbledCheck == True):

            str_sletNnetStatus = str(request.POST.get(
                "str_sletNnetStatus", 'No Caste Info Recieved'))
            v_subjSlet = request.POST.get(
                "v_subjSlet", 'No SLET Marks Recieved')
            v_subjNet = request.POST.get("v_subjNet", 'No NET Marks Recieved')
            v_subjHandled = request.POST.get(
                "v_subjHandled", 'No Subject Handled Recieved')

            bool_equivFlag1 = request.POST.get(
                "bool_equivFlag1", 'false')  # Equivalence Check 1
            bool_equivFlag2 = request.POST.get(
                "bool_equivFlag2", 'false')  # Equivalence Check 2

            sletNetCheck = pg_sletNnet(
                str_sletNnetStatus, v_subjSlet, v_subjNet, v_subjHandled, bool_equivFlag1, bool_equivFlag2, pgCalc_55MarksforNonOC_18072018_04102019)

            if(sletNetCheck == True):
                str_subjHandledStatus = request.POST.get(
                    "str_subjHandledStatus", "No Subject Handled  Status Info Recieved")

                v_subjHandled = request.POST.get(
                    "v_subjHandled", "No Subject Handled Applied Info Recieved")  # Name of Subject Handled from DB.

                v_subjApplied = request.POST.get(
                    "v_subjApplied", "No Subject Applied Info Recieved")  # Name of Post Applied  from DB.

                toConsider = pg_subjCheck(
                    str_subjHandledStatus, v_subjHandled, v_subjApplied, pgCalc_55MarksforNonOC_18072018_04102019)

    if(toConsider == False):
        response = "pgCalc_55MarksforOCnGT : Step 3 - All Checks Failed - Dont Consider This Date "

    else:
        log.info("pgCalc_55MarksforOCnGT : Step 4 - All Checks Failed ")
        log.info("pgCalc_55MarksforOCnGT : Step 4.1 - Dont Consider This Date")
        response = "pgCalc_55MarksforOCnGT : Step 4.2 - All Checks Failed - Dont Consider This Date "

    print(toConsider)
    if(toConsider == True):
        response = str(dt_elp_toDt - dt_elp_fromDt)

    return response


"""This method is used check the PHD submitted before 31.12.2002  
for SC / SCA / ST / Diff Abled (50% marks)

Name : phdCalc_submtdbfr_31122002
Parameters :
-----------

   dt_por - date of publication of results
   str_caste - Caste Category
   int_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""


@svc_phdCalc_submtdbfr_31122002.post(require_csrf=False)
def phdCalc_submtdbfr_31122002(request):
    response = "Hello 55 Marks for OC /GT "

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # TODO Move this to a config file or DB
    DT_POR_FROM_CUTOFF = datetime.datetime(2018, 7, 18).date()
    DT_POR_TO_CUTOFF = datetime.datetime(2019, 10, 4).date()
    DT_PHD_TO_CUTOFF = datetime.datetime(2002, 12, 31).date()

    # Get the values from the request object
    dt_pg_por = datetime.datetime.strptime(request.POST.get(
        "dt_pg_por", 'No PG POR Date Recieved'), '%d/%m/%Y').date()

    dt_phd_por = datetime.datetime.strptime(request.POST.get(
        "dt_phd_por", 'No PHD POR Date Recieved'), '%d/%m/%Y').date()

    dt_elp_fromDt = datetime.datetime.strptime(request.POST.get(
        "dt_elp_fromDt", 'No From Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    dt_elp_toDt = datetime.datetime.strptime(request.POST.get(
        "dt_elp_toDt", 'No To Date - Eligible Period Of Service Recieved'), '%d/%m/%Y').date()

    str_caste = str(request.POST.get("str_caste", 'No Caste Info Recieved'))
    bool_diffAbled = request.POST.get("bool_diffAbled", 'false')
    int_pgMarks = request.POST.get("int_pgMarks", 'No PG Marks Recieved')

    # Special Marks Override to be considered for SC Category
    percentileToBeConsidered = BusinessConstants.MARKS_55_PER

    # Entry Check Point if DT_POR_FROM_CUTOFF <= dt_por <= DT_POR_TO_CUTOFF
    if DT_POR_FROM_CUTOFF <= dt_pg_por <= DT_POR_TO_CUTOFF:
        log.info("%s: Step 1 - POR Date within CutOff Date",
                 phdCalc_submtdbfr_31122002)

        if str(str_caste) == BusinessConstants.SC_CATEGORY:
            log.info("pgCalc_55MarksforOCnGT : Step 2 - SC Category Check")

            percentileToBeConsidered = BusinessConstants.MARKS_50_PER

        diffAbledCheck = pg_diffAbCheck(bool_diffAbled, int_pgMarks,
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

                if(bool_chk1 == True):
                    toConsider = pg_subjCheck(
                        v_subjHandled, v_subjApplied, bool_equivFlag1, phdCalc_submtdbfr_31122002)

            if(sletNetCheck == True):
                str_subjHandledStatus = request.POST.get(
                    "str_subjHandledStatus", "No Subject Handled  Status Info Recieved")

                v_subjHandled = request.POST.get(
                    "v_subjHandled", "No Subject Handled Applied Info Recieved")  # Name of Subject Handled from DB.

                v_subjApplied = request.POST.get(
                    "v_subjApplied", "No Subject Applied Info Recieved")  # Name of Post Applied  from DB.

                toConsider = pg_subjCheck(
                    str_subjHandledStatus, v_subjHandled, v_subjApplied, phdCalc_submtdbfr_31122002)

    if(toConsider == False):
        response = "pgCalc_55MarksforOCnGT : Step 3 - All Checks Failed - Dont Consider This Date "

    else:
        log.info("pgCalc_55MarksforOCnGT : Step 4 - All Checks Failed ")
        log.info("pgCalc_55MarksforOCnGT : Step 4.1 - Dont Consider This Date")
        response = "pgCalc_55MarksforOCnGT : Step 4.2 - All Checks Failed - Dont Consider This Date "

    print(toConsider)
    if(toConsider == True):
        response = str(dt_elp_toDt - dt_elp_fromDt)

    return response
