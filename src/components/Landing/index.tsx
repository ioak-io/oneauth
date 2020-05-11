import React, { useState } from 'react';
import './style.scss';
import { NavLink } from 'react-router-dom';
import OakButton from '../../oakui/OakButton';

const Landing = () => {
  return (
    <div className="landing">
      <div className="space-bottom-4">
        <h3>Mirror rorriM</h3>
        <p>
          <em>
            <b>Queen</b>
          </em>{' '}
          Magic Mirror on the wall, who now is the fairest one of all?
        </p>
        <p>
          <em>
            <b>Magic Mirror</b>
          </em>{' '}
          Over the seven jewelled hills, beyond the seventh fall, in the cottage
          of the seven dwarfs, dwells Snow White, fairest one of all.
        </p>
        <p>
          <em>
            <b>Queen</b>
          </em>{' '}
          Snow White lies dead in the forest. The huntsman has brought me proof.
          [holds up her opened box] Behold, her heart.
        </p>
        <p>
          <em>
            <b>Magic Mirror</b>
          </em>{' '}
          Snow White still lives, the fairest in the land. Tis the heart of a
          pig you hold in your hand.
        </p>
        <p>
          <em>
            <b>Queen</b>
          </em>{' '}
          [repulsed] The heart of a pig?! Then I&apos;ve been tricked!
        </p>
      </div>
      <div className="action">
        <NavLink to="/tenant" className="navitem" activeClassName="active">
          <OakButton theme="primary" variant="disappear">
            Create Tenant
          </OakButton>
        </NavLink>
      </div>
      {/* <OakSubMenu data = {this.state.data} variant="secondary"/>
      <div>
        <OakButton align="left" theme="primary" variant="disappear" icon="open_in_new" action="">disappear</OakButton>
        <OakButton align="right" theme="default" variant="appear" icon="open_in_new" action="">appear</OakButton>
        <OakButton align="right" theme="secondary" variant="regular" icon="open_in_new" action="">regular</OakButton>
        <OakButton align="right" theme="secondary" variant="block" icon="open_in_new" action="">block</OakButton>
        <OakButton align="right" theme="secondary" variant="outline" icon="open_in_new" action="">outline</OakButton>
        <OakButton align="right" theme="secondary" variant="block" icon="open_in_new" action=""></OakButton>
      </div> */}
    </div>
  );
};

export default Landing;
