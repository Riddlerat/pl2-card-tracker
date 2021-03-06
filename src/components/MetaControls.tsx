import { autobind } from "core-decorators";
import * as React from "react";
import { Dispatch } from "redux";

import { TAction } from "../state/actions";
import * as citiesActions from "../state/cities/actions";
import * as infectionActions from "../state/infection/actions";
import { IAppState } from "../state/reducer";
import { connect } from "../utils";

// Props from external user
interface IOwnProps {}

// Props from state
interface IStateProps {}

// Props from mapDispatchToProps
interface IDispatchProps {
  resetInfections: () => void;
  addCity: (cityName: string) => void;
}

interface IProps extends IStateProps, IDispatchProps, IOwnProps {}

interface IState {
  cityName: string;
}

@autobind
class MetaControls extends React.Component<IProps, IState> {
  public static mapStateToProps(state: IAppState): IStateProps {
    return {};
  }

  public static mapDispatchToProps(
    dispatch: Dispatch<TAction>,
  ): IDispatchProps {
    return {
      addCity: (name: string) => dispatch(citiesActions.add(name)),
      resetInfections: () => dispatch(infectionActions.reset()),
    };
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      cityName: "",
    };
  }

  private handleAddCity() {
    const { addCity } = this.props;
    const { cityName } = this.state;
    addCity(cityName);
  }

  private handleResetInfections() {
    const { resetInfections } = this.props;
    resetInfections();
  }

  private handleCityNameChange(ev: React.ChangeEvent<HTMLInputElement>) {
    if (ev.target.value) {
      this.setState({ cityName: ev.target.value });
    }
  }

  public render() {
    const { cityName } = this.state;

    return (
      <div className="MetaControls">
        <input
          value={cityName}
          onChange={this.handleCityNameChange}
          placeholder="City Name"
        />
        <button onClick={this.handleAddCity}>Add City</button>
        <button onClick={this.handleResetInfections}>Reset Infections</button>
      </div>
    );
  }
}

export default connect(MetaControls);
