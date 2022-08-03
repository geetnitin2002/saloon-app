import React from "react";
import styled from "styled-components";
import ApiConfig from "../../../../apiConfig";
import LazyImage from "../../../components/loadImage";
import { throwStatement } from "@babel/types";
import FileUploader from "./fileUpload";
import {getImages} from "../../../api/businessApi";
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

export class GalleryBeforeSave extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      serviceDetails: null,
      closeTicketModel: true,
      currentImage: this.props.number,
      data: [],
      imageArray: null,
      myFileMain: null,
      replaceIndex: null
    };
  }

  getImageURL(image: any) {
    
    if(typeof(image.url) === "string" && image.url!= ""){
      return `data:image/jpeg;base64,${image.url}`
    }else if(!image.hasOwnProperty('url')){
      console.log("image testing",URL.createObjectURL(image))
      return URL.createObjectURL(image);
    }
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const { imageArray, myFileMain , business_id  } = nextProps;
    console.log(">>>spandana",imageArray );
    //console.log(nextProps.myFileMain)
    let propsData: any = [];
    if (prevState.imageArray !== imageArray || prevState.myFileMain !== myFileMain) {
      if (imageArray && Array.isArray(imageArray) && imageArray.length > 0) {
        imageArray.map((imageitem:any)=>{
          if(imageitem.hasOwnProperty('url') && imageitem.url!== ""){
            propsData.push(imageitem)
          }else if(!imageitem.hasOwnProperty('url')) {
            propsData.push(imageitem)
          }
        })
       // propsData.push.apply(propsData, imageArray);
        
      }
      if (myFileMain) {
        propsData = [myFileMain, ...propsData];
        //console.log(myFileMain);
       // this.setState({ currentImage: count });
        
        
      }
      //alert(propsData)
    }
    if (propsData.length > 0) {
      return {
        data: propsData,
      }
    } else{
      return {data : []};
    }

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
   // alert(this.state.data.length)
   //alert(count)
   let data=this.state.data.filter((person: { url: string; }) => person.url !="");
    if (count < data.length && count > -1  ) {
      this.setState({ currentImage: count });
    }
  };

  // added handleClick for replace Image on 13/10/2020
  handleClick = (index: any) => {
    this.setState({
      replaceIndex: index
    })
    let input: any = document.getElementById('fileUploader');
    input.click();
  }


  handleAdd = () => {
    let input: any = document.getElementById('fileUploaderAdd');
    input.click();
  }
  
  
  // added deleteImage on 13/10/2020
  deleteImage = (index: any, file: any) => {
    this.props.deleteImage(index, file);
   if (this.state.currentImage === index) {
      this.setState({ currentImage: 0 })
    }
  }
  render() {
    const { data } = this.state;
    console.log(">>>state",this.state)
   //console.log(">>>data",res.data.Child[1])
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
          {}
            {data && data.length > 0 && data.filter((person: { url: string; }) => person.url !="").map((file: any, index: any) => (
              <>
                {(!file.hasOwnProperty('url') || (file.url && file.url!=="")) && this.state.currentImage == index && (
                  <SwiperSlide
                    className={`swiper-slide ${
                      this.state.currentImage == index
                        ? " is-selected swiper-slide-active"
                        : ""
                      }`}
                    id={index}
                  >
                    <LazyImage
                      src={this.getImageURL(file)}
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
              <>
               {(!file.hasOwnProperty('url') || (file.url && file.url!=="")) &&<ThumbSwiperSlide
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
                    onClick={() => this.changeImage(index)}
                    src={this.getImageURL(file)}
                    alt="Listing Image"
                    style={this.getImageStyle()}
                    id={index + 'd'}
                  />
                  {/* added two Buttons for download and delete on 13/10/2020 */}
                  <Button style={{ marginRight: '70px' }} href={this.getImageURL(file)} download>
                    <img src='https://cdn4.iconfinder.com/data/icons/documents-42/512/document_file_paper_page-07-512.png'></img>
                  </Button>
                  <Button style={{ marginRight: '38px' }} onClick={() => this.deleteImage(index, file)} >
                    <img src='https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/basket-512.png'></img>
                  </Button>
                  <Button style={{ marginRight: '5px' }} onClick={() => this.handleClick(index)} >
                    <img src='https://cdn4.iconfinder.com/data/icons/bold-purple-free-samples/32/Arrows_Refresh_Replace_Round_Circle-256.png'></img>
                  </Button>
                  <input type="file" onChange={(e: any) => this.props.replaceImage(e.target.files, this.state.replaceIndex, file)} id="fileUploader" style={{ display: "none" }} />
                </ThumbSwiperSlide>}

              </>
            ))}
            <div style={{
              background: 'yellow'
            }}>

              {this.state.data.length<=4 && <Button style={{ marginRight: '5px' }} onClick={() => this.handleAdd()} >

                <img src='https://cdn2.iconfinder.com/data/icons/budicon-interface-layout-2/16/21-interface_-_plus_add-128.png'></img>
              </Button>}

              <input type="file" onChange={(e: any) => this.props.addImage(e)} id="fileUploaderAdd" style={{ display: "none" }} />

            </div>
          </div>
        </div>
      </div>
    );
  }
}
