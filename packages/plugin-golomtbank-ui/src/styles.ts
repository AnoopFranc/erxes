import { dimensions } from '@erxes/ui/src/styles';
import styled from 'styled-components';
export const ConfigList = styled.div`
  a {
    padding: 0;
  }
`;
export const LoyaltyAmount = styled.div`
  font-weight: 800;
  line-height: 20px;
  padding-left: 15px;
  display: flex;
  position: relative;
  flex-direction: row;
  transition: all ease 0.3s;
`;

export const ContentBox = styled.div`
  padding: ${dimensions.coreSpacing}px;
  margin: 0 auto;
`;

export const FinanceAmount = styled.div`
  float: right;
`;

export const FlexRow = styled.div`
  flex: 1;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;

  > div:first-child {
    padding-right: ${dimensions.coreSpacing}px;
  }
`;

export const DetailRow = styled(FlexRow)`
  justify-content: space-around;
`;
export const Content = styled.div`
  padding: ${dimensions.coreSpacing}px;
`;

export const CustomRangeContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-end;
  > div {
    flex: 1;
    margin-right: 8px;
    input[type='text'] {
      border: none;
      width: 100%;
      height: 34px;
      padding: 5px 0;
      color: #444;
      border-bottom: 1px solid;
      border-color: #ddd;
      background: none;
      border-radius: 0;
      box-shadow: none;
      font-size: 13px;
    }
  }
`;

export const BlockRow = styled(FlexRow)`
  align-items: center;
  margin-bottom: ${dimensions.unitSpacing}px;

  > label {
    margin-right: 10px;
  }

  > div {
    padding-right: ${dimensions.coreSpacing}px;
    width: 33%;

    &.description {
      width: 50%;
    }

    .jJKBbS {
      margin: 0;
    }

    @media (max-width: 1250px) {
      flex: 1;
    }
  }
`;

export const FilterContainer = styled.div`
  padding: 10px 20px 20px;
`;


