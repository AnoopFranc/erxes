import * as classNames from 'classnames';
import * as React from 'react';
import {
  defaultAvatar,
  facebook,
  github,
  link,
  linkedin,
  twitter,
  youtube,
} from '../../../icons/Icons';
import { IParticipator, IUserDetails, IUserLinks } from '../../../types';
import { readFile } from '../../../utils';
import SocialLink from './SocialLink';

type Props = {
  user?: IParticipator;
  isOnline: boolean;
  isExpanded: boolean;
  showTimezone?: boolean;
};

function Profile(props: Props) {
  const { isOnline, isExpanded, showTimezone } = props;
  const user = props.user || ({} as IParticipator);
  const userDetail = user.details || ({} as IUserDetails);
  const links = user.links || ({} as IUserLinks);
  const avatar = userDetail.avatar || defaultAvatar;

  const socialLinks = () => {
    return (
      <div className="socials">
        <SocialLink url={links.facebook} icon={facebook} />
        <SocialLink url={links.twitter} icon={twitter} />
        <SocialLink url={links.linkedIn} icon={linkedin} />
        <SocialLink url={links.youtube} icon={youtube} />
        <SocialLink url={links.github} icon={github} />
        <SocialLink url={links.website} icon={link} />
      </div>
    );
  };

  const bottomContent = () => {
    return (
      <div className="bottom-content">
        {userDetail.description && <p>{userDetail.description}</p>}
        {socialLinks()}
      </div>
    );
  };

  const stateClass = classNames('erxes-state', {
    online: isOnline,
  });

  return (
    <div className="conversation-detail-top-bar-wrapper">
      <div className="supporter-info-container">
        <div className="avatar">
          <img src={readFile(avatar)} alt={userDetail.fullName} />
          <span className={stateClass} />
        </div>
        <div className="supporter-info">
          <h5>{userDetail.fullName}</h5>
          <p>{userDetail.location}</p>
          {/* {!showTimezone ? (
            <span>{userDetail.position}</span>
          ) : (
            <span>{userDetail.location}</span>
          )} */}
        </div>
      </div>

      {/* {isExpanded && bottomContent()} */}
    </div>
  );
}

export default Profile;
