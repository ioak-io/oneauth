import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import {
  faCheck,
  faChevronRight,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Input,
  Select,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "basicui";
import Topbar from "../../../components/Topbar";
import "./style.scss";
import { newId } from "../../../events/MessageService";
import {
  getAttributedef,
  saveAttributedef,
  getAttributedefScope,
  saveAttributedefScope,
} from "./service";
import MainSection from "../../../components/MainSection";
import AttributedefModel from "../../../model/AttributedefModel";
import AttributedefItems from "./AttributedefItems";

interface Props {
  space: string;
}

const THIS_YEAR = new Date().getFullYear();

const EMPTY_ACCOUNT: AttributedefModel = {
  name: "",
  group: "",
  type: "short-text",
  reference: "",
  linkable: false,
};

const AttributedefPage = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [formId, setFormId] = useState(newId());
  const [state, setState] = useState<AttributedefModel[]>([]);

  useEffect(() => {
    if (authorization.isAuth) {
      getAttributedef(props.space, authorization).then(
        (response: AttributedefModel[]) => {
          setState(response);
        }
      );
    }
  }, [authorization]);

  const handleChange = (
    event: any,
    record: AttributedefModel,
    index: number
  ) => {
    const _state = [...state];
    _state[index] = {
      ..._state[index],
      [event.currentTarget.name]: event.currentTarget.value,
    };
    setState(_state);
  };

  const addAttributedef = () => {
    setState([...state, { ...EMPTY_ACCOUNT, reference: uuidv4() }]);
  };

  const save = () => {
    saveAttributedef(props.space, state, authorization).then(
      (response: any) => {
        console.log(response);
      }
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleDelete = (record: AttributedefModel) => {
    setState(state.filter((item) => item.reference !== record.reference));
  };

  return (
    <div className="attributedef-page page-animate">
      <Topbar title="Metadata - Custom note attributes" />
      <MainSection>
        <div className="attributedef-page__action">
          <Button onClick={addAttributedef}>
            <FontAwesomeIcon icon={faPlus} /> New Attribute
          </Button>
        </div>
        <AttributedefItems
          data={state}
          formId={formId}
          handleChange={handleChange}
          handleDelete={handleDelete}
          handleAddAttributedef={addAttributedef}
        />
        <div className="footer">
          <div />
          <div className="footer-right">
            <Button onClick={save}>
              <FontAwesomeIcon icon={faCheck} />
              Save
            </Button>
            <Button onClick={goBack}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </div>
        </div>
      </MainSection>
    </div>
  );
};

export default AttributedefPage;
