import React from 'react';
import { useQuery, useSubscription } from 'react-apollo';
import gql from 'graphql-tag';
import Component from '../components/Widget';
import { queries, subscriptions } from '../graphql';
import { IUser } from '@erxes/ui/src/auth/types';
import withCurrentUser from '@erxes/ui/src/auth/containers/withCurrentUser';
import Spinner from '@erxes/ui/src/components/Spinner';
import { Alert } from '@erxes/ui/src/utils';

type Props = {
  currentUser: IUser;
};

const WdigetListContainer = (props: Props) => {
  const { currentUser } = props;

  const { loading, error, data, refetch } = useQuery(
    gql(queries.getUnreadChatCount)
  );

  useSubscription(gql(subscriptions.chatUnreadCountChanged), {
    variables: { userId: currentUser._id },
    onSubscriptionData: () => {
      refetch();
    }
  });

  const chats = useQuery(gql(queries.chats));

  if (loading || chats.loading) {
    return <Spinner objective={true} />;
  }

  if (error) {
    Alert.error(error.message);
  }

  return (
    <Component
      unreadCount={data.getUnreadChatCount || 0}
      currentUser={currentUser}
      lastChat={chats.data.chats.list[0]}
    />
  );
};

const WithCurrentUser = withCurrentUser(WdigetListContainer);

export default (props: Props) => <WithCurrentUser {...props} />;
