import React from 'react';
import { ShowPreview } from '@erxes/ui-forms/src/forms/styles';
import {
  Icon,
  Button,
  confirm,
  __,
  ModalTrigger,
  colors,
  FormGroup,
  ControlLabel,
  Tip,
  Form as CommonForm,
  FormControl
} from '@erxes/ui/src';
import { IField } from '@erxes/ui/src/types';
import {
  FormColumn,
  FormWrapper,
  ModalFooter,
  ColorPick,
  ColorPicker
} from '@erxes/ui/src/styles/main';
import {
  ContentWrapper,
  FormContainer,
  PreviewWrapper,
  Box as FormTriggerBtn,
  Typography,
  FormContent
} from '../styles';
import CreateForm from '@erxes/ui-forms/src/forms/containers/CreateForm';
import EditForm from '@erxes/ui-forms/src/forms/containers/EditForm';
import client from '@erxes/ui/src/apolloClient';
import { mutations } from '../categories/graphql';
import gql from 'graphql-tag';
import Select from 'react-select-plus';
import { calculateMethods, COLORS } from '../common/constants';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import TwitterPicker from 'react-color/lib/Twitter';
import { RiskCalculateLogicType } from '../common/types';

type Props = {
  formId?: string;
  doc: any;
  handleChange: (doc) => void;
  totalFormsCount: number;
  max: number;
};

type State = {
  isReadyToSave: boolean;
  doc: any;
};

class Item extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isReadyToSave: false,
      doc: {}
    };
  }

  handleCloseForm = closeModal => {
    const { formId } = this.state.doc;
    const { doc } = this.props;

    if (formId && !doc) {
      confirm(
        `Are you sure you want to close.Your created form won't save`
      ).then(() => {
        client.mutate({
          mutation: gql(mutations.removeUnsavedRiskAssessmentCategoryForm),
          variables: { formId }
        });
        return closeModal();
      });
    }
    closeModal();
  };

  renderFormContent = ({ closeModal }) => {
    const { formId } = this.props;

    const formPreview = (previewRenderer, fields: IField[]) => {
      const handleSaveForm = () => {
        this.setState({ isReadyToSave: true });
      };

      const footer = (items: number) => {
        if (items === 0) {
          return null;
        }

        return (
          <>
            <ShowPreview>
              <Icon icon="eye" /> {__('Form preview')}
            </ShowPreview>
            <ModalFooter>
              <Button
                btnStyle="simple"
                type="button"
                icon="cancel-1"
                onClick={() => this.handleCloseForm(closeModal)}
              >
                Cancel
              </Button>

              <Button
                btnStyle="success"
                type="button"
                icon="cancel-1"
                onClick={handleSaveForm}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        );
      };
      return (
        <PreviewWrapper>
          {previewRenderer()}
          {footer(fields ? fields.length : 0)}
        </PreviewWrapper>
      );
    };
    const afterDbSave = (formId: string) => {
      this.setState(prev => ({
        isReadyToSave: false
      }));
      this.props.handleChange({ ...this.props.doc, formId });
      closeModal();
    };

    const formProps = {
      renderPreviewWrapper: formPreview,
      afterDbSave,
      type: 'risk-assessment',
      isReadyToSave: this.state.isReadyToSave,
      hideOptionalFields: false
    };
    if (formId) {
      return (
        <ContentWrapper>
          <EditForm {...formProps} formId={formId} />
        </ContentWrapper>
      );
    }

    return (
      <ContentWrapper>
        <CreateForm {...formProps} />
      </ContentWrapper>
    );
  };

  renderLogic(
    { _id, name, logic, value, value2, color }: RiskCalculateLogicType,
    formProps
  ) {
    const handleRow = e => {
      const { doc, handleChange } = this.props;
      const { name, value } = e.currentTarget as HTMLInputElement;
      const newVariables =
        doc.calculateLogics &&
        doc?.calculateLogics.map(logic =>
          logic._id === _id
            ? {
                ...logic,
                [name]: ['value', 'value2'].includes(name)
                  ? parseInt(value)
                  : value
              }
            : logic
        );
      //   this.setState(prev => ({
      //     doc: {
      //       ...prev.doc,
      //       calculateLogics: newVariables
      //     }
      //   }));
      handleChange({ ...doc, calculateLogics: newVariables });
    };

    const removeLogicRow = e => {
      const { doc, handleChange } = this.props;
      const removedLogicRows =
        doc.calculateLogics &&
        doc?.calculateLogics.filter(logic => logic._id !== _id);
      //   this.setState(prev => ({
      //     doc: {
      //       ...prev.doc,
      //       calculateLogics: removedLogicRows
      //     }
      //   }));
      handleChange({
        ...doc,
        calculateLogics: removedLogicRows
      });
    };

    const onChangeColor = hex => {
      const { doc, handleChange } = this.props;
      const newVariables =
        doc.calculateLogics &&
        doc.calculateLogics.map(logic =>
          logic._id === _id ? { ...logic, color: hex } : logic
        );
      //   this.setState(prev => ({
      //     doc: {
      //       ...prev.doc,
      //       calculateLogics: newVariables
      //     }
      //   }));
      handleChange({
        ...doc,
        calculateLogics: newVariables
      });
    };

    const renderColorSelect = selectedColor => {
      const popoverBottom = (
        <Popover id="color-picker">
          <TwitterPicker
            width="266px"
            triangle="hide"
            color={selectedColor}
            onChange={e => onChangeColor(e.hex)}
            colors={COLORS}
          />
        </Popover>
      );

      return (
        <OverlayTrigger
          trigger="click"
          rootClose={true}
          placement="bottom-start"
          overlay={popoverBottom}
        >
          <ColorPick>
            <ColorPicker style={{ backgroundColor: selectedColor }} />
          </ColorPick>
        </OverlayTrigger>
      );
    };

    return (
      <FormWrapper style={{ margin: '5px 0' }} key={_id}>
        <FormColumn>
          <FormControl
            {...formProps}
            name="name"
            type="text"
            defaultValue={name}
            onChange={handleRow}
            required
          />
        </FormColumn>
        <FormColumn>
          <FormControl
            name="logic"
            {...formProps}
            componentClass="select"
            required
            defaultValue={logic}
            onChange={handleRow}
          >
            <option />
            {['(>) greater than', '(<) lower than', '(≈) between'].map(
              value => (
                <option value={value} key={value}>
                  {value}
                </option>
              )
            )}
          </FormControl>
        </FormColumn>
        <FormColumn>
          <FormContainer row gap align="center">
            <FormControl
              {...formProps}
              name="value"
              type="number"
              defaultValue={value}
              onChange={handleRow}
              required
            />
            {logic === '(≈) between' && (
              <>
                <span>-</span>
                <FormControl
                  {...formProps}
                  name="value2"
                  type="number"
                  defaultValue={value2}
                  onChange={handleRow}
                  required
                />
              </>
            )}
          </FormContainer>
        </FormColumn>
        <FormColumn>{renderColorSelect(color)}</FormColumn>
        <Tip text="Remove Row" placement="bottom">
          <Button
            btnStyle="danger"
            icon="times"
            onClick={removeLogicRow}
            style={{ marginLeft: '10px' }}
          />
        </Tip>
      </FormWrapper>
    );
  }

  renderLogics(formProps) {
    const { doc } = this.props;

    return (
      doc.calculateLogics &&
      doc.calculateLogics.map(logic => this.renderLogic(logic, formProps))
    );
  }

  renderContent = () => {
    const { doc, totalFormsCount, max } = this.props;

    const formTrigger = (
      <Button
        btnStyle="link"
        icon={!!this.props.doc.formId ? 'file-edit-alt' : 'file-plus-alt'}
        iconColor={colors.colorPrimary}
      >
        {__(!!this.props.doc?.formId ? 'Edit a form' : 'Build a form')}
      </Button>
    );

    const handleAddLevel = e => {
      const { doc, handleChange } = this.props;
      const variables = {
        _id: Math.random().toString(),
        name: '',
        value: 0,
        logic: ''
      };

      handleChange({
        ...doc,
        calculateLogics: [...(doc.calculateLogics || []), variables]
      });
    };

    const handleChangeCalculateMethod = ({ value }) => {
      const { doc, handleChange } = this.props;

      handleChange({ ...doc, calculateMethod: value });
    };

    const handleChangePercentWeight = e => {
      const { doc, handleChange } = this.props;
      const { value } = e.currentTarget as HTMLInputElement;

      handleChange({ ...doc, percentWeight: parseInt(value) });
    };

    const content = formProps => (
      <>
        {max}
        <FormContainer></FormContainer>
        <FormWrapper>
          <FormColumn>
            <FormGroup>
              <ControlLabel>{__('Calculate Methods')}</ControlLabel>
              <Select
                placeholder={__('Select Calculate Method')}
                value={doc?.calculateMethod}
                options={calculateMethods}
                multi={false}
                onChange={handleChangeCalculateMethod}
              />
            </FormGroup>
          </FormColumn>
          {totalFormsCount > 1 && (
            <FormGroup>
              <ControlLabel>{__('Percent weight')}</ControlLabel>
              <FormControl
                type="number"
                name="percentWeight"
                value={doc?.percentWeight}
                // max={!!max ? doc?.percentWeight + max : doc?.percentWeight}
                max={50}
                maxLength={50}
                min={0}
                onChange={handleChangePercentWeight}
              />
            </FormGroup>
          )}
          <ModalTrigger
            isAnimate
            title="Build New Form"
            enforceFocus={false}
            size="xl"
            content={this.renderFormContent}
            trigger={formTrigger}
          />
        </FormWrapper>
        <FormWrapper>
          {['Name', 'Logic', 'Value', 'Status Color'].map(head => (
            <FormColumn key={head}>
              <ControlLabel required>{head}</ControlLabel>
            </FormColumn>
          ))}
          <Tip text="Add Level" placement="bottom">
            <Button btnStyle="default" icon="add" onClick={handleAddLevel} />
          </Tip>
        </FormWrapper>
        {this.renderLogics(formProps)}
      </>
    );

    return <CommonForm renderContent={content} />;
  };

  render() {
    return <FormContent>{this.renderContent()}</FormContent>;
  }
}

export default Item;
