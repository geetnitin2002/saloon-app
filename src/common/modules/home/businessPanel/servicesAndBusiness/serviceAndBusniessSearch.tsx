import React from "react";
import Select from "react-select";
interface IServiceAndBusinessSearchProps {
  readonly serviceCategoriessAndBusinesses: {
    id: any;
    value: any;
    type?: any;
  }[];
  readonly locationList: { label?: any; value?: any }[];
  readonly searchClick: any;
  readonly defaultValue: any;
  readonly location?: any;
}
export class ServiceAndBusinessSearch extends React.Component<
  IServiceAndBusinessSearchProps,
  any
> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedService: this.props.location && this.props.location.state,
      selectedLocations: null
    };
  }
  handleServiceChange = (value: any) => {
    this.setState({ selectedService: value });
  };
  handleLocationChange = (value: any) => {
    this.setState({ selectedLocations: value });
  };
  componentWillUnmount() {
    this.props.location.state = null;
  }
  render() {
    return (
      <>
        <div className="main-search main-search--layout-1 bg-mirage">
          <div className="col-md-9 main-search__group main-search__group--primary">
            <div className="row">
              <div className="col-md-7">
                <Select
                  Searchable={true}
                  defaultValue={this.state.selectedService}
                  getOptionLabel={option => option.value}
                  getOptionValue={option => option.id}
                  options={this.props.serviceCategoriessAndBusinesses}
                  placeholder={"Choose a service"}
                  minLength={5}
                  pageSize={5}
                  name="name"
                  onChange={this.handleServiceChange}
                />
              </div>
              <div className="col-md-5">
                <Select
                  Searchable={true}
                  getOptionLabel={option => option.label}
                  getOptionValue={option => option.value}
                  options={this.props.locationList}
                  placeholder={"Where"}
                  minLength={5}
                  isClearable={true}
                  pageSize={5}
                  name="location"
                  onChange={this.handleLocationChange}
                />
              </div>
            </div>
          </div>

          <div className="col-md-3 main-search__group main-search__group--tertiary">
            <button
              className="button button--medium button--square button--search"
              onClick={() => this.props.searchClick(this.state)}
            >
              <i className="fa fa-search"></i>Go
            </button>
          </div>
        </div>
      </>
    );
  }
}
