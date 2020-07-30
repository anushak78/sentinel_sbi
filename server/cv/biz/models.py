# Copyright (C) 2018 NSEIT Limited, Mumbai. All rights reserved.
#
# This program and the accompanying materials are made available
# under the terms described in the LICENSE file which accompanies
# this distribution. If the LICENSE file was not attached to this
# distribution or for further clarifications, please contact
# legal@nseit.com.

# Local Variables:
# mode: python
# End:


import logging
import random
import hashlib
import six
import enum

from pyramid.security import Allow

from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    Table,
    DateTime,
    text
)
from sqlalchemy.orm import relationship, backref

from ..core.meta import Base

log = logging.getLogger(__name__)


class DocumentTypes(Base):
    __tablename__ = 'cv_document_types_master'
    __table_args__ = {"schema": "cv"}

    id = Column(Integer, primary_key=True)
    doc_type = Column(String(256), nullable=False)
    doc_id = Column(Integer, nullable=False)

    def __init__(self, doc_type, doc_id):
        self.doc_type = doc_type
        self.doc_id = doc_id
        self.schema = 'cv'

    @classmethod
    def get_all_documents(cls, dbsession):
        documents = dbsession.query(cls).all()
        docs = []
        for doc in documents:
            docs.append({
                "doc_type": doc.doc_type,
                "doc_id": doc.doc_id
            })
        return docs

class QuestionTypes(Base):
    __tablename__ = 'cv_question_types_master'
    __table_args__ = {"schema": "cv"}

    id = Column(Integer, primary_key=True)
    qn_type = Column(String(256), nullable=False)
    qn_id = Column(Integer, nullable=False)
    doc_id = Column(Integer, nullable=False)

    def __init__(self, qn_type, qn_id, doc_id):
        self.qn_type = qn_type
        self.qn_id = qn_id
        self.doc_id = doc_id


class AnswerTypes(Base):
    __tablename__ = 'cv_answer_types_master'
    __table_args__ = {"schema": "cv"}

    id = Column(Integer, primary_key=True)
    ans_type = Column(String(256), nullable=False)
    ans_id = Column(Integer, nullable=False)
    qn_id = Column(Integer, nullable=False)
    doc_id = Column(Integer, nullable=False)

    def __init__(self, ans_type, ans_id, qn_id, doc_id):
        self.ans_type = ans_type
        self.ans_id = ans_id
        self.qn_id = qn_id
        self.doc_id = doc_id


class CandidateDocumentStatus(Base):
    __tablename__ = 'cv_candidate_document_status'
    __table_args__ = {"schema": "cv"}

    id = Column(Integer, primary_key=True)
    candidate_id = Column(String(256), nullable=False)
    level = Column(Integer, nullable=False)
    status = Column(Integer, nullable=False)
    doc_id = Column(Integer, nullable=False)
    user_id = Column(Integer, nullable=False)
    created_at = Column(DateTime, server_default=text('NOW()'))

    def __init__(self, candidate_id, level, doc_id, status, user_id):
        self.candidate_id = candidate_id
        self.level = level
        self.doc_id = doc_id
        self.status = status
        self.user_id = user_id

    @classmethod
    def get_document_status(cls, dbsession, candidate_id, doc_id, level):
        doc_status = dbsession.query(cls).filter(
            cls.candidate_id == candidate_id).filter(
            cls.doc_id == doc_id).filter(
            cls.level == level).all()
        docs = []
        for doc in doc_status:
            docs.append({
                "candidate_id": doc.candidate_id,
                "level": doc.level,
                "doc_id": doc.doc_id,
                "status": doc.status,
                "user_id": doc.user_id
            })
        return docs

    @classmethod
    def get_distinct_candidate(cls, dbsession,level):
        candidate_ids = dbsession.query(cls.candidate_id).distinct().filter(
            cls.level==level
        ).all()
        ids = []
        for user_id in candidate_ids:
            ids.append(user_id.candidate_id)
        return ids

    @classmethod
    def get_document_by_candidate_id(cls, dbsession, candidate_id):
        document = dbsession.query(cls).filter(
            cls.candidate_id == candidate_id
        ).all()
        docs = []
        for d in document:
            docs.append({
                "candidate_id": d.candidate_id,
                "level": d.level,
                "doc_id": d.doc_id,
                "status": d.status,
                "user_id": d.user_id
            })
        return docs


    @classmethod
    def get_document_status_of_all_levels(cls,dbsession,user_id):
        doc_status = dbsession.query(cls).with_entities(cls.doc_id,
                                                        cls.status,DocumentTypes.doc_type,cls.level,cls.created_at).join(
            DocumentTypes, cls.doc_id == DocumentTypes.doc_id).filter(
            cls.candidate_id == user_id).all()
        docs = []
        for doc in doc_status:
            docs.append({
                "doc_id": doc.doc_id,
                "level": doc.level,
                "status": doc.status,
                "doc_type": doc.doc_type,
                "created_at": doc.created_at
            })
        return docs

class VerificationAnswers(Base):
    __tablename__ = 'cv_verification_answers'
    __table_args__ = {"schema": "cv"}

    id = Column(Integer, primary_key=True)
    candidate_id = Column(String(256), nullable=False)
    level = Column(Integer, nullable=False)
    doc_id = Column(Integer, nullable=False)
    qn_id = Column(Integer, nullable=False)
    ans_id = Column(Integer, nullable=False)
    user_id = Column(Integer, nullable=False)
    additional_info = Column(String(512), nullable=True, default='')
    created_at = Column(DateTime, server_default=text('NOW()'))

    def __init__(self, candidate_id, level, doc_id, qn_id, ans_id, user_id,
                 additional_info):
        self.candidate_id = candidate_id
        self.level = level
        self.doc_id = doc_id
        self.qn_id = qn_id
        self.ans_id = ans_id
        self.user_id = user_id
        self.additional_info = additional_info

    @classmethod
    def get_verification_answers(cls, dbsession, candidate_id, doc_id, level):
        answers = dbsession.query(cls).filter(
            cls.candidate_id == candidate_id).filter(
            cls.doc_id == doc_id).filter(
            cls.level == level).all()
        ans_list = []
        for ans in answers:
            ans_list.append({
                "candidate_id": ans.candidate_id,
                "level": ans.level,
                "doc_id": ans.doc_id,
                "qn_id": ans.qn_id,
                "ans_id": ans.ans_id,
                "user_id": ans.user_id,
                "additional_info": ans.additional_info
            })
        return ans_list


class UserComments(Base):
    __tablename__ = 'cv_user_comments'
    __table_args__ = {"schema": "cv"}

    id = Column(Integer, primary_key=True)
    candidate_id = Column(String(256), nullable=False)
    level = Column(Integer, nullable=False)
    comment = Column(String(512), nullable=False)
    status = Column(Integer, nullable=False)
    created_at = Column(DateTime, server_default=text('NOW()'))

    def __init__(self, candidate_id, level, comment, status):
        self.candidate_id = candidate_id
        self.level = level
        self.comment = comment
        self.status = status

    @classmethod
    def get_comment(cls, dbsession, candidate_id, level):
        data = dbsession.query(cls).filter(
            cls.candidate_id == candidate_id,
            cls.level > 1
        )
        comment_list = {'level2': {}, 'level3': {}}
        for comment in data:
            comment_list['level' + str(comment.level)] = {
                "candidate_id": comment.candidate_id,
                "level": comment.level,
                "comment": comment.comment,
                "status": comment.status
            }
        return comment_list

    @classmethod
    def get_status(cls, dbsession, candidate_id, level):
        data = dbsession.query(cls).filter(
            cls.candidate_id == candidate_id,
            cls.level == level
        )
        status = 0
        for comment in data:
            status = comment.status
        return status

    @classmethod
    def get_candidate_status_of_all_level(cls, dbsession, candidate_id):
        data = dbsession.query(cls).filter(
            cls.candidate_id == candidate_id
        )
        comment_list = []
        for comment in data:
            comment_list.append({
                "level": comment.level,
                "status": comment.status,
                "comment": comment.comment
            })
        return comment_list
