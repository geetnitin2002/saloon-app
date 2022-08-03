import React from "react";
import styled from "styled-components";
import ApiConfig from "../../../../apiConfig";
import LazyImage from "../../../components/loadImage";
const SwiperSlide = styled.div`
  //  width: 710px;
  // margin-right: 10px;
`;
const ThumbSwiperSlide = styled.div`
  width: 102px;
  margin-right: 10px;
`;

// changed updateBusiness on 13/10/2020
const Button = styled.a`
    display: block;
    width: 26px;
    height: 26px;
    text-align: center;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    line-height: 25px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    background: #d4d4d4;
`;

// added updateBusiness on 13/10/2020
const FileUpload = styled.button`
    display: block;
    width: 87px;
    height: 29px;
    background: #123145;
    padding: 3px;
    text-align: center;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    line-height: 25px;
`;

export class Gallery extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    let data = [`${ApiConfig.IMAGE_URL}Bid_${this.props.id}_Image_Main.png`, `${ApiConfig.IMAGE_URL}Bid_${this.props.id}_Image1.png`, `${ApiConfig.IMAGE_URL}Bid_${this.props.id}_Image2.png`,
    `${ApiConfig.IMAGE_URL}Bid_${this.props.id}_Image3.png`, `${ApiConfig.IMAGE_URL}Bid_${this.props.id}_Image4.png`]
    this.state = {
      serviceDetails: null,
      closeTicketModel: true,
      currentImage: 0,
      data: data,
      replaceFile: null
    };
  }
  getImageStyle = () => {
    return {
      width: "120px",
      height: "90px",
      background: "#b3b3b3",
      margin: "auto",
    };
  };
  getImageStyle1 = () => {
    return {
      width: "400px",
      height: "300px",
      margin: "auto",
    };
  };

  changeImage = (count: any) => {
    if (count < this.state.data.length && count >= 0) {
      this.setState({ currentImage: count });
    }
  };
  // added deleteImage on 13/10/2020
  deleteImage = (index: any) => {
    let data = this.state.data;
    data.splice(index, 1);
    this.setState({ data: data }, () => {
      this.setState({ currentImage: 0 })
    })
  }

  // added handleClick for replace Image on 13/10/2020
  handleClick = (file: any) => {
    this.setState({
      replaceFile: file
    })
    let input: any = document.getElementById('fileUploader');
    input.click();
  }
  handleAdd = () => {
    let input: any = document.getElementById('fileUploaderAdd');
    input.click();
  }

  render() {
    const { data } = this.state;
    return (
      <div
        id="gallery"
        className="listing-section bg-white hover-effect"
        data-matching-link="#gallery-link"
      >
        <div className="listing-section__header">
          <h3 className="listing-section__title">Gallery</h3>
        </div>
        <div className="swiper-container listing-gallery-top">
          <div className="swiper-wrapper">
            {data && data.length > 0 && data.map((file: any, index: any) => (
              <>
                {this.state.currentImage == index && (
                  <SwiperSlide
                    className={`swiper-slide ${
                      this.state.currentImage == index
                        ? " is-selected swiper-slide-active"
                        : ""
                      }`}
                    id={index}
                  >
                    <LazyImage
                      src={file + '?t=' + new Date().getTime()}
                      alt="Listing Image"
                      style={this.getImageStyle1()}
                      id={index + 'up'}
                    />
                  </SwiperSlide>
                )}
              </>
            ))}

          </div>
          <span
            className="ion-chevron-left c-white listing-button listing-button-prev"
            onClick={() => this.changeImage(this.state.currentImage - 1)}
          ></span>
          <span
            className="ion-chevron-right c-white listing-button listing-button-next"
            onClick={() => this.changeImage(this.state.currentImage + 1)}
          ></span>
        </div>

        <div className="swiper-container listing-gallery-thumb">
          <div className="swiper-wrapper">
            {data && data.length > 0 && data.map((file: any, index: any) => (
              <ThumbSwiperSlide
                className={`swiper-slide is-selected swiper-slide-active`}
                //  ${
                //   this.state.currentImage == index
                //     ? "is-selected swiper-slide-active"
                //     : ""
                // }`}
                id={index}
              >

                {/* added onClick method on 13/10/2020 */}
                <LazyImage
                  index={index}
                  onClick={() => this.changeImage(index)}
                  src={file + '?t=' + new Date().getTime()}
                  alt="Listing Image"
                  onError={this.deleteImage}
                  style={this.getImageStyle()}
                  id={index + 'd'}
                />
                {/* added two Buttons for download and delete on 13/10/2020 */}
                <Button style={{ marginRight: '70px' }} href={file} download>
                  <img src='https://cdn4.iconfinder.com/data/icons/documents-42/512/document_file_paper_page-07-512.png'></img>
                </Button>
                <Button style={{ marginRight: '38px' }} onClick={() => {
                  this.deleteImage(index)
                  this.props.deleteSavedImage(file, index)
                }} >
                  <img src='https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/basket-512.png'></img>
                </Button>
                <Button style={{ marginRight: '5px' }} onClick={() => this.handleClick(file)} >
                  <img src='https://cdn4.iconfinder.com/data/icons/bold-purple-free-samples/32/Arrows_Refresh_Replace_Round_Circle-256.png'></img>
                </Button>
                <input type="file" onChange={(e: any) => this.props.updateImage(e.target.files, this.state.replaceFile)} id="fileUploader" style={{ display: "none" }} />
              </ThumbSwiperSlide>
            ))}
            
            <div style={{
              background: 'yellow'
            }}>
              <Button style={{ marginRight: '5px' }} onClick={() => this.handleAdd()} >
                <img src='https://cdn4.iconfinder.com/data/icons/bold-purple-free-samples/32/Arrows_Refresh_Replace_Round_Circle-256.png'></img>
              </Button>
              <input type="file" onChange={(e: any) => this.props.addImage(e)} id="fileUploaderAdd" style={{ display: "none" }} />

            </div>
          </div>
        </div>
      </div>
    );
  }
}
