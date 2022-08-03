import React from "react";
// @ts-ignore
import SalonLogo from "TARGET_BUILD/images/logo.png";
// @ts-ignore
import Listing from "TARGET_BUILD/images/uploads/listing-1.jpg";
import Listing2 from "TARGET_BUILD/images/uploads/listing-2.jpg";
import Listing3 from "TARGET_BUILD/images/uploads/listing-3.jpg";
import Listing4 from "TARGET_BUILD/images/uploads/listing-4.jpg";
import BannerpanelComponent from "./bannerPanel/bannerPanel";
import BusinessPanel from "./businessPanel/businessPanel";
import FooterComponent from "../../components/footerComponent";
import FeedbackComponent from "../../components/feedbackComponent";
import BUSINESS_APP from "../../../apiConfig";
import { Link } from "react-router-dom";
// import ChooseBookingCritera from "../view/chooseBookingCriteria/chooseBookingCriteria";
interface IlistView {
  readonly id: number;
  readonly image: any;
  readonly imageUrl: any;
  readonly distance: string;
  readonly title: string;
  readonly titileUrl: any;
  readonly reviewsCount: any;
  readonly location: any;
}

const serviceListArray: IlistView[] = [
  {
    distance: "2.5 KM Away",
    id: 1,
    image: Listing,
    imageUrl: "",
    location: " 18 Leinster Terr, Paddington",
    reviewsCount: 5,
    titileUrl: "",
    title: "Hair Stylists"
  },
  {
    distance: "2.8 KM Away",
    id: 2,
    image: Listing2,
    imageUrl: "",
    location: "18 Leinster Terr, Paddington",
    reviewsCount: 5,
    titileUrl: "",
    title: "Spa & Beauty Salon"
  },
  {
    distance: "2.8 KM Away",
    id: 3,
    image: Listing3,
    imageUrl: "",
    location: "18 Leinster Terr, Paddington",
    reviewsCount: 1,
    titileUrl: "",
    title: "Massage Parlour"
  },
  {
    distance: "2.5 KM Away",
    id: 4,
    image: Listing4,
    imageUrl: "",
    location: " 18 Leinster Terr, Paddington",
    reviewsCount: 5,
    titileUrl: "",
    title: "Hair Stylists"
  },
  {
    distance: "2.8 KM Away",
    id: 5,
    image: Listing,
    imageUrl: "",
    location: "18 Leinster Terr, Paddington",
    reviewsCount: 5,
    titileUrl: "",
    title: "Spa & Beauty Salon"
  },
  {
    distance: "2.8 KM Away",
    id: 6,
    image: Listing3,
    imageUrl: "",
    location: "18 Leinster Terr, Paddington",
    reviewsCount: 1,
    titileUrl: "",
    title: "Massage Parlour"
  }
];
class HomeContainer extends React.Component<any, any> {
  redirectLink = (url: any) => {
    return {
      pathname: url,
    };
  };
  handleButtonClick = () => {
    //this.props.history.push("/business-registearion");
  };
  handleSignUpClick = () => {
    this.props.history.push("/login");
  };

  // myname = {
  //   firstName: "Bob",
  //   lastName: "Dylan"
  // };
  render() {
    return (
      <>
        <header
          id="masthead"
          className="site-header site-header--layout-1 site-header--fluid site-header--absolute"
        >
          <div className="d-lg-flex justify-content-lg-between align-items-lg-center site-header__container">
            <div className="d-lg-flex align-items-lg-center">
              <div className="site-header__logo">
                <h1 className="screen-reader-text">The Salon</h1>
                <Link to={() => this.redirectLink("/")}>
                <img src={SalonLogo} alt="Salon" />
                </Link>
              </div>
            </div>
            <div className="d-lg-flex align-items-lg-center">
              <div className="user-action">
                <a
                  href={void 0}
                  onClick={this.handleSignUpClick}
                  className="sign-in"
                >
                  <i className="fa fa-user" />
                  <span style={{ marginLeft: "5px" }}>Sign in</span>
                </a>
                <button
                  className="button button--small button--pill button--primary d-none d-lg-inline-block"
                  onClick={this.handleButtonClick}
                >
                  <span>&#43;</span>{" "}
                  <a
                    href={BUSINESS_APP.BUSINESS_APP}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    For Businesses
                  </a>
                </button>
              </div>
            </div>
          </div>
        </header>
        {/* <ChooseBookingCritera /> */}
        <BannerpanelComponent history={this.props.history} />
        <section className="listing-list page-section bg-wild-sand listing-list--layout-1">
          <div className="container">
            <h2 className="page-section__title t-left">
              Recently Viewed Businesses
            </h2>
            <div className="row">
              {serviceListArray.map((row, index) => (
                <BusinessPanel data={row} index={index} key={row.id} />
              ))}
            </div>
          </div>
        </section>
        <FeedbackComponent />
        <FooterComponent />
      </>
    );
  }
}

export default HomeContainer;
