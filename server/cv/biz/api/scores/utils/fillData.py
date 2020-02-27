from sqlalchemy import (
    text,
    inspect
)

from sqlalchemy.ext.serializer import loads, dumps

from ....models import (
    CandidateDocumentStatus,
    VerificationAnswers,
    UserComments,
    DocumentTypes
)

# class FillData:

# def get_predata_PG(dbsession,request_list):