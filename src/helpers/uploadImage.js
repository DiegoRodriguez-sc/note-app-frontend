

export const uploadImage = async(file) => {

 const url = "https://api.cloudinary.com/v1_1/dgxoj05dn/upload";

 const formData = new FormData();
 formData.append("upload_preset","note-app");
 formData.append("file",file);

  try {
     const resp = await fetch(url,{
        method:"POST",
        body:formData,
     });

     if(resp.ok){
     const body = await resp.json();
     return body.secure_url;
     }else{
      throw await resp.json();
     }
     
  } catch (error) {
    throw error;
  }


}