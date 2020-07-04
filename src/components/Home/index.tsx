import React, { useEffect } from 'react';
import './style.scss';
import Navigation from '../Navigation';
import { sendMessage } from '../../events/MessageService';

interface Props {
  label?: string;
  logout: Function;
}
const Home = (props: Props) => {
  useEffect(() => {
    sendMessage('navbar', true);
  }, []);
  return (
    <div className="page-home">
      <div className="app-container smooth-page">
        <div className="home">
          <div className="typography-10">What is OneAuth?</div>
          <div className="typography-5">
            OneAuth is an enterprise level single sign on (SSO) solution for
            authentication
            <div className="typography-10">Why OneAuth? </div>
            OneAuth supports multitenant architecture out of the box with
            security in the core. It helps customers with a single sign on
            solution which can be incorporated for a single application or
            multiple application. It is also opensource project which helps
            customers to understand the solution in better way.
            <div className="typography-10">How to use?</div>
            To onboard into OneAuth you need to follow below basic steps -
            <ol>
              <li>
                Identify an admin and create OneAuth account for the admin using
                https://oneauth.ioak.org/#/{' '}
              </li>
              <li>
                You can create account using any of the below mechanisms o
                Google authentication o Facebook authentication o Create account
                in IOAK with email Id - Once account is created check for
                further instruction sent to the email
              </li>
              <li>
                - After confirmation, login to OneAuth with
                https://oneauth.ioak.org/#/{' '}
              </li>
              <li>
                - Create a space for your organization ( You can have multiple
                space as well) - Create a application and provide your
                application url which will be used for redirecting - Once
                created map the application with space - Copy the application Id
                and add it to the environment variable for your application for
                connecting to oneauth. - Try navigation from application, you
                will be asked to register again. This registration for
                application, not the admin registration That’s it, you have
                integrated your application with OneAuth
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
