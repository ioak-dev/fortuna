import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import OakInput from '../../../oakui/wc/OakInput';

import './Details.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import { FORTUNA_PREF_ADDBILL_DATE } from '../../../constants/SessionStorageConstants';
import ScheduleReceiptModel from '../../../model/ScheduleReceiptModel';
import OakSelect from '../../../oakui/wc/OakSelect';
import OakCheckbox from '../../../oakui/wc/OakCheckbox';
import OakButton from '../../../oakui/wc/OakButton';
import { deleteTransactions, repostTransactions } from './service';
import { fetchAndSetExpenseItems } from '../../../actions/ExpenseActions';
import { fetchAndSetReceiptItems } from '../../../actions/ReceiptActions';

interface Props {
  receipt: ScheduleReceiptModel;
  space: string;
  handleDataChange: any;
}

const Details = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const expenseFilter = useSelector((state: any) => state.expense.filter);
  const expensePagination = useSelector(
    (state: any) => state.expense.pagination
  );
  const receiptFilter = useSelector((state: any) => state.receipt.filter);
  const receiptPagination = useSelector(
    (state: any) => state.receipt.pagination
  );

  const refreshStore = () => {
    dispatch(
      fetchAndSetExpenseItems(props.space, authorization, {
        ...expenseFilter,
        pagination: {
          ...expensePagination,
          pageSize: 20,
          pageNo: 0,
          hasMore: true,
        },
      })
    );
    dispatch(
      fetchAndSetReceiptItems(props.space, authorization, {
        ...receiptFilter,
        pagination: {
          ...receiptPagination,
          pageSize: 20,
          pageNo: 0,
          hasMore: true,
        },
      })
    );
  };

  const deletePosting = () => {
    if (props.receipt?._id) {
      deleteTransactions(props.space, props.receipt._id, authorization).then(
        (response: any) => {
          refreshStore();
          props.handleDataChange([]);
        }
      );
    }
  };

  const runSchedule = () => {
    if (props.receipt?._id) {
      repostTransactions(props.space, props.receipt._id, authorization).then(
        (response: any) => {
          refreshStore();
          props.handleDataChange(response);
        }
      );
    }
  };

  return (
    <div className="sch-rec-rb-pg">
      <div className="page-title">Control panel</div>
      <div className="sch-rec-rb-pg__main">
        <div>
          <div>
            Delete all transactions posted by this schedule. This will remove
            all the automatic postings made by this schedule so far
          </div>
          <OakButton handleClick={deletePosting} theme="info">
            Delete all transactions
          </OakButton>
        </div>
        <div>
          <div>
            Run this schedule again and rewrite the postings till today. This
            will remove all the existing postings made by this schedule, and
            then add new transactions with the latest definition for all past
            periods till today
          </div>
          <OakButton handleClick={runSchedule} theme="info">
            Repost transactions
          </OakButton>
        </div>
        <div>
          <div>
            Delete schedule. This will not remove the postings made by the
            schedule so far. If you would like to delete the transactions posted
            by the schedule so far, use the Delete all transactions option
            before deleting the schedule. If the schedule being deleted has any
            postings in the system, the schedule will be marked as archived
            instead of deleting
          </div>
          <OakButton handleClick={runSchedule} theme="info">
            Delete schedule
          </OakButton>
        </div>
      </div>
    </div>
  );
};

export default Details;
