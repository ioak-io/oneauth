import React, { useEffect } from 'react';
import './style.scss';
import Navigation from '../Navigation';
import { sendMessage } from '../../events/MessageService';

interface Props {
  label?: string;
  logout: Function;
}
const SpaceHome = (props: Props) => {
  useEffect(() => {
    sendMessage('navbar', true);
  }, []);

  return (
    <div className="app-page">
      <div className="app-container">
        <div className="home">
          <div className="typography-10 space-bottom-2">
            Home page and Landing page
          </div>
          <div className="typography-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum
            erat sed elit blandit mattis. Mauris accumsan, nulla ac eleifend
            molestie, magna mi tincidunt odio, et tempor mi nisi eu nunc. Aenean
            et dapibus est, at malesuada ante. Aenean orci eros, euismod
            fermentum nisl vel, scelerisque viverra velit. Fusce ac egestas
            velit. Vestibulum mattis laoreet commodo. Vivamus at laoreet augue.
            Fusce eu suscipit augue, quis rhoncus ipsum. Fusce faucibus justo eu
            diam posuere, quis sollicitudin lacus placerat. Sed a purus congue,
            tincidunt metus ac, interdum elit. Duis fermentum lectus id nisl
            convallis imperdiet. Ut non dui eleifend, posuere dui in, iaculis
            magna. Sed maximus efficitur purus id scelerisque. Proin rutrum ex
            sit amet justo lobortis, ut iaculis nibh aliquet. Morbi pharetra
            risus id ullamcorper vulputate. Nullam at mollis nulla.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceHome;
