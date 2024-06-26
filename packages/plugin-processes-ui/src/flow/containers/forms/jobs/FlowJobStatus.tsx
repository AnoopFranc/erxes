import * as compose from 'lodash.flowright';

import { FlowsQueryResponse, IJob } from '../../../types';
import React, { useState } from 'react';

import { IUser } from '@erxes/ui/src/auth/types';
import { JobRefersQueryResponse } from '../../../../job/types';
import JobStatus from '../../../components/forms/jobs/JobStatus';
import { ProductsQueryResponse } from '@erxes/ui-products/src/types';
import Spinner from '@erxes/ui/src/components/Spinner';
import { queries as flowsQueries } from '../../../graphql';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import { queries as jobRefersQueries } from '../../../../job/graphql';
import { queries as productQueries } from '@erxes/ui-products/src/graphql';
import { withProps } from '@erxes/ui/src/utils';

type Props = {
  activeFlowJob: IJob;
  flowJobs: IJob[];
  closeModal: () => void;
  setUsedPopup: (check: boolean) => void;
};

type FinalProps = {
  jobRefersQuery: JobRefersQueryResponse;
  subFlowsQuery: FlowsQueryResponse;
  productsQuery: ProductsQueryResponse;
  currentUser: IUser;
} & Props;

const FlowJobStatusContainer = (props: FinalProps) => {
  const { currentUser, jobRefersQuery, productsQuery, subFlowsQuery } = props;

  const [saveLoading] = useState(false);

  if (
    jobRefersQuery.loading ||
    productsQuery.loading ||
    subFlowsQuery.loading
  ) {
    return <Spinner />;
  }

  const jobRefers = jobRefersQuery.jobRefers || [];
  const products = productsQuery.products || [];
  const subFlows = subFlowsQuery.flows || [];

  const updatedProps = {
    ...props,
    currentUser,
    saveLoading,
    jobRefers,
    products,
    subFlows,
  };

  return <JobStatus {...updatedProps} />;
};

export default withProps<Props>(
  compose(
    graphql<Props, JobRefersQueryResponse>(gql(jobRefersQueries.jobRefers), {
      name: 'jobRefersQuery',
      options: ({ flowJobs }) => ({
        variables: {
          ids: (flowJobs || [])
            .filter((j) => j.config && j.config.jobReferId)
            .map((j) => j.config.jobReferId),
        },
      }),
    }),
    graphql<Props, FlowsQueryResponse>(gql(flowsQueries.subFlows), {
      name: 'subFlowsQuery',
      options: ({ flowJobs }) => ({
        variables: {
          ids: (flowJobs || [])
            .filter((j) => j.config && j.config.subFlowId)
            .map((j) => j.config.subFlowId),
        },
      }),
    }),
    graphql<Props, ProductsQueryResponse>(gql(productQueries.products), {
      name: 'productsQuery',
      options: ({ flowJobs }) => ({
        variables: {
          ids: (flowJobs || [])
            .filter((j) => j.config && j.config.productId)
            .map((j) => j.config.productId),
        },
      }),
    }),
  )(FlowJobStatusContainer),
);
