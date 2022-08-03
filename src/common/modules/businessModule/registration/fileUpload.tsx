import * as React from "react";

class FileUpload extends React.Component<any, any> {
  state = {
    error: null,
    myFile: null,
    myFileMain: null,
  };

/**
 * added getDerivedStateFromProps on 13/10/2020 for handling delete and replace of images from gallary
 */
  static getDerivedStateFromProps(nextProps : any, prevState : any){
     const {deleteImageIndex, replaceImageIndex, replaceImageData} = nextProps;
     if(deleteImageIndex !== null && deleteImageIndex === 0 && prevState.myFileMain !== null){
    let dt = new DataTransfer()
   let input : any = document.getElementById('myMainFile');
     input.files = dt.files;
    let  payload = {
          error: null,
          myFile: prevState.myFile,
          myFileMain: null,
        };
     nextProps.uploadFile(payload)
      return{
        myFileMain: null,
    }
   }else if(deleteImageIndex !== null ){
   let dt = new DataTransfer()
  let input : any = document.getElementById('myFileList');
  let files :any = input.files  || []
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    let imageIndex = prevState.myFileMain === null ? deleteImageIndex : deleteImageIndex -1
    if (imageIndex !== i) dt.items.add(file) // here you exclude the file. thus removing it.
  }     if(dt.files.length > 0){
         input.files = dt.files;
    }else{
        let dt = new DataTransfer()
       input.files = dt.files;
    }
       let  payload = {
          error: null,
          myFile: input.files.length > 0 ? input.files : null ,
          myFileMain: prevState.myFileMain,
        };
     nextProps.uploadFile(payload)
        return{
        myFile: dt.files,
      }
   } 
   if(replaceImageIndex !== null && replaceImageData !== null && replaceImageIndex === 0 && prevState.myFileMain !== null){
    let dt = new DataTransfer()
   let input : any = document.getElementById('myMainFile');
     input.files = replaceImageData;
    let  payload = {
          error: null,
          myFile: prevState.myFile,
          myFileMain: replaceImageData,
        };
     nextProps.uploadFile(payload)
      return{
        myFileMain: replaceImageData,
  }
   }
else if(replaceImageIndex !== null && replaceImageData !== null ){
   let dt = new DataTransfer()
  let input : any = document.getElementById('myFileList');
  let files :any = input.files  || []
  for (let i = 0; i < files.length; i++) {
     const file = files[i];
         let imageIndex = prevState.myFileMain === null ? replaceImageIndex : replaceImageIndex -1
         debugger
    if (imageIndex === i){
      // here you replace the file.
       dt.items.add(replaceImageData[0])
       }else{
         dt.items.add(file)
       } 
  }     
   input.files = dt.files;
       let  payload = {
          error: null,
          myFile: dt.files,
          myFileMain: prevState.myFileMain,
        };
     nextProps.uploadFile(payload)
        return{
        myFile: dt.files,
      }
   }       return null;
  }

  onChangeHandlerMutiple = (event: any) => {
    const name = event.target.name;
    this.setState({ error: null });
    if (name === "myFileMain" && this.checkMimeType(event)) {
      this.setState(
        {
          myFileMain: event.target.files,
        },
        () => this.props.uploadFile(this.state, 0)
      );
    } else {
      if (this.maxSelectFile(event) && this.checkMimeType(event)) {
        this.setState(
          {
            myFile: event.target.files,
          },
          () => {
            console.log(">>>>typ",typeof this.state.myFile, this.state.myFile)
            this.props.uploadFile(this.state)
          }
        );
      }
    }
  };
  maxSelectFile = (event: any) => {
    let files = event.target.files; // create file object
    if (files.length > 4) {
      const msg = "Only 4 images can be uploaded";
      this.setState({ error: msg });
      event.target.value = null; // discard selected file
      return false;
    }
    return true;
  };
  checkMimeType = (event: any) => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = "";
    // list allow mime type
    const types = ["image/png", "image/jpeg", "image/gif", "image/heic"];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (
        types.every((type) => files[x].type !== type) &&
        files[x].name.split(".").pop() !== "heic"
      ) {
        // create error message and assign to container
        err += files[x].type + " is not a supported format\n";
      }
    }

    if (err !== "") {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      console.log(err);
      this.setState({ error: err });
      return false;
    }
    return true;
  };

  render() {
    return (
      <>
        {" "}
        <div className="form-col" id="myFileMain">
          
        <div className="listing-section__header">
          <h3 className="listing-section__title">Business Pictures</h3>
        </div>
          <label>Main Picture (.png, .jpeg)</label>
          <div className="form-holder">
            <input
              name="myFileMain"
              className="sc-bdVaJa bDWFJH form-control"
              id="myMainFile"
              type="file"
              placeholder=".png"
              onChange={this.onChangeHandlerMutiple}
              disabled={this.props.disable}
            />
          </div>
        </div>
 
        <div className="form-col" id="myFile">
          <label>Add up to 4 additional pictures (.png, .jpeg)</label>
          <div className="form-holder">
            <input
              name="myFile"
              className="sc-bdVaJa bDWFJH form-control"
              id="myFileList"
              type="file"
              placeholder=".png"
              onChange={this.onChangeHandlerMutiple}
              disabled={this.props.disable}
              multiple
            />
          </div>
        </div>
        {this.state.error !== null && (
          <div className="row">
            <p className="error">{this.state.error}</p>
          </div>
        )}
      </>
    );
  }
}

export default FileUpload;
