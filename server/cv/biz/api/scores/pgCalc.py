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


# TODO Move these to a config file or DB
# Business Constants
DT_POR_CUTOFF = datetime.datetime(1991, 9, 18).date()

log = logging.getLogger(__name__)

svc_pgCalc_50mNabove = Service(
    name="biz.api.scores.pgCalc_50mNabove", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/pgCalc_50mNabove", cors_policy=cors.POLICY)


svc_pgCalc_55Mark4OCGT = Service(
    name="biz.api.scores.pgCalc_55Mark4OCGT", permission=NO_PERMISSION_REQUIRED,
    path="/biz/scores/pgCalc_55Mark4OCGT", cors_policy=cors.POLICY)


"""
This method is to check for Subject Check if Subject Handled and Subject Applied 
are the same
 
Name : pg_subjCheck
PARAMETERS :
-----------

str_subjHandledStatus - Subject handled Status
v_subHandled - Subject handled during Course
v_subjApplied - Subject applied for Post

"""


def pg_subjCheck(str_subjHandledStatus, v_subjHandled, v_subjApplied):

    if (int(str_subjHandledStatus) == BusinessConstants.MATCHED):
        log.info("Step 4.2.1 - Subject Handled matches")

        if(str(v_subjHandled) == str(v_subjApplied)):
            log.info(
                "Step 4.2.2 - Subject Handled Matches Subject Applied ")
            log.info("Step 4.2.3 - Consider This Date")
            return True
        else:
            log.info("Step 4.2.4 - Post Applied does not match")
            log.info("Step 4.2.5 - Dont Consider this Date")
            return False
    else:
        log.info("Step 4.2.6 - Subject Handled does not match")
        log.info("Step 4.2.7 - Dont Consider this date")
        return False


"""This method is used get the PG with 50% marks and above

Name : pgCalc_50mNabove
Parameters :
-----------

   dt_por - date of publication of results
   str_caste - Caste Category
   int_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""
@svc_pgCalc_50mNabove.post(require_csrf=False)
def pgCalc_50mNabove(request):
    response = "Consider This Date"

    toConsider = False  # Toggle Flag to calculate the Date Difference

    # Get the values from the request object
    dt_por = datetime.datetime.strptime(request.POST.get(
        "dt_por", 'No POR Date Recieved'), '%d/%m/%Y').date()

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
    if dt_por < DT_POR_CUTOFF:
        log.info("Step 1 - POR Date within CutOff Date")

        if str_caste == BusinessConstants.OC_CATEGORY:
            log.info("Step 2 - Candidate in OC Category")

            if(bool_diffAbled == True):
                log.info("Step 3 - Candidate in Differently Abled Category")

                if(int(int_pgMarks) >= BusinessConstants.MARKS_50_PER):
                    log.info("Step 3.1 - >= 50% Marks Pass")
                    log.info("Step 3.2 - Consider this Date")
                    toConsider = pg_subjCheck(str_subjHandledStatus,
                                              v_subjHandled, v_subjectApplied)
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
                                              v_subjHandled, v_subjectApplied)

                    if(toConsider != True):
                        response = " Step 4.3 - All Checks Failed - Dont Consider This Date"

                else:
                    log.info("Step 4.4 - 55% Marks Failed ")
                    log.info("Step 4.5 -  Dont Consider This Date")
                    response = "Step 4.6 - 55% Marks Failed - Dont Consider This Date"

        elif str_caste == BusinessConstants.OC_OTHER_STATE:
            log.info("Step 4.7 - Candidate in OC Other State Category")
            toConsider = pg_subjCheck(str_subjHandledStatus,
                                      v_subjHandled, v_subjectApplied)
            if(toConsider != True):
                response = " Step 4.8 - All Checks Failed - Dont Consider This Date"

    else:
        log.info("Step 4.9 - All Checks Failed ")
        log.info("Step 4.10 - Dont Consider This Date")
        response = " Step 4.11 - All Checks Failed - Dont Consider This Date "

    print(toConsider)
    if(toConsider == True):
        response = str(DT_POR_CUTOFF - dt_por)

    return response


"""This method is used get the PG with 55% marks for GC / GT (NET/SLET/ CISR) 
for SC / SCA / ST / Diff Abled (50% marks)

Name : pgCalc_55Mark4OCGT
Parameters :
-----------

   dt_por - date of publication of results
   str_caste - Caste Category
   int_pgMarks - PG marks
   bool_diffAbl - Differently Abled Category
   str_subjHandled - Name of Subject Handled
   str_postApplied - Name of Post Applied
"""


@svc_pgCalc_55Mark4OCGT.post(require_csrf=False)
def pgCalc_55Mark4OCGT(request):
    response = "Hello 55 Marks for OC /GT "

    return response
