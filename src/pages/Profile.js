import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "./../components/Utilities/firebase";
import AvatarContext from "../store/avatar-context.js";
import { useNavigate } from "react-router-dom";
import classes from "../styles/Profile.module.css";
import Modal from "react-modal";
import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner.js";
import ReactDOM from 'react-dom';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "min(80vw, 40rem)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
};

Modal.setAppElement("#root");
const Profile = () => {
  const [isSending, setIsSending] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  // const [imageList, setImageList] = useState([]);
  const [isOpenModal, setIsModalOpen] = useState(false);
  const [error, setError] = useState({});
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const avtCTX = useContext(AvatarContext);
  const navigate = useNavigate();
  let errorColor;

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const afterOpenModal = () => {
    errorColor.style.color = "#F00";
  };
  const uploadImageHandler = (e) => {
    // console.log(e.target.files[0].type);
    // console.log(e.target.files[0]);
    const data = e.target.files[0].type;
    const size = e.target.files[0].size;
    const checkTypeofData = data.split("/");
    if (checkTypeofData[0] !== "image" || size > 100000) {
      setIsModalOpen(true);
      if (checkTypeofData[0] !== "image")
        setError({
          header: "خطا",
          content: "لطفا از فایل هایی با پسوند .gpeg,.svg,.png استفاده کنید",
        });
      if (size > 100000)
        setError({
          header: "خطا",
          content: "سایز تصویر استفاده شده باید کمتر از 100 کیلوبایت باشد",
        });
      return;
    }
    setImageUpload(e.target.files[0]);

    updateThumbnailImage(e.target.files);
  };

  const dropElementHandler = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      let dataFile = e.dataTransfer.files;
      // console.log(dataFile);
      updateThumbnailImage(dataFile);
    }
  };
  const avatarUn = avtCTX.avatarUniqueToken.split(".com");
  const sendData = async (userName = "hi") => {
    await fetch(
      `https://authentication-user-541a0-default-rtdb.firebaseio.com/${avatarUn[0]}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ userId: userName }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // const data = await response.json();
  };
  const submitFormHandler = (e) => {
    e.preventDefault();
    setLoadingSpinner(true);
    const fd = new FormData(e.target);
    const userId = fd.get("userId");
    console.log(userId.length);

    // console.log(imageUpload);
    if (imageUpload == null || userId.length < 3) {
      setIsModalOpen(true);
      if (imageUpload == null) {
        setError({
          header: "خطا",
          content: "لطفا یک فایل تصویری وارد کنید",
        });
      }
      if (userId.length < 3) {
        setError({
          header: "خطا",
          content: "لطفا نام کاربری معتبر وارد کنید",
          guidance: "(نام کاربری باید بیش از 3 کارکتر باشد)",
        });
      }
      if (userId.length < 3 && imageUpload == null) {
        setError({
          header: "خطا",
          content: "لطفا نام کاربری و فایل تصویری معتبر وارد کنید",
          guidance:
            "(نام کاربری باید بیش از 3 کارکتر باشد و حجم فایل تصویری باید کمتر از 100 کیلوبایت باشد)",
        });
      }
      return;
    }
    /* const storageRef = storage.ref();
    storageRef.listAll().then(res => {
      res.items.forEach(imgRef => {
        imgRef.getDownloadURL().then(url => {
          setAllImages(prevState => [...prevState, url]);
        })
      });
    }).catch(error => console.log(error)) */
    sendData(userId).catch((error) => console.log(error.message));
    const imageRef = ref(storage, `image${avtCTX.avatarUniqueToken}/image`);
    console.log(imageRef);
    uploadBytes(imageRef, imageUpload).then((data) => {
      getDownloadURL(data.ref)
        .then((url) => {
          // setImageList((prevState) => [...prevState, url]);
          // setImageList([url]);
        })
        .catch((error) => {
          throw new Error(error.message);
          return;
        });
    });
    // console.log(!!imageUpload);
    // setIsSending(!!imageUpload);
    setTimeout(() => {
      setIsSending(!!imageUpload);
      setLoadingSpinner(false);
    }, 3000);
  };

  /* 
  useEffect(() => {
    const imageListRef = ref(storage, `image${avtCTX.avatarUniqueToken}/`)
    console.log(imageListRef)
    // setImageList([imageListRef])
    listAll(imageListRef).then(response => {
      console.log(response);
      response.items.forEach(item => {
        getDownloadURL(item).then(url => {
          setImageList([url]);
        })
      })
    })
  }, [])

 */

  /* useEffect(() => {
    listAll(imageList).then((response) => {
      console.log(response);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          //1.
          let pictureRef = storage.refFromURL(url);
          //2.
          pictureRef
            .delete()
            .then(() => {
              //3.
              setAllImages(allImages.filter((image) => image !== url));
              alert("Picture is deleted successfully!");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    });
  }, [allImages, imageList]); */
  /* const removePic = () => {
    const imageListRef = ref(
      storage,
      `image`
    );
    listAll(imageListRef).then((response) => {
      console.log(response);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          //1.
          let pictureRef = storage.refFromURL(url);
          //2.
          pictureRef
            .delete()
            .then(() => {
              //3.
              setAllImages(allImages.filter((image) => image !== url));
              alert("Picture is deleted successfully!");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    });
  } */

  const saveChangesHandler = () => {
    navigate(0);
  };

  function updateThumbnailImage(file) {
    // console.log(file[0].type);
    if (file[0].type.startsWith("image/")) {
      let reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        setImageUrl(reader.result);
      };
    }
  }
  return (
    <>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Error Modal Handler"
        onAfterOpen={afterOpenModal}
      >
        <header>
          <h2 ref={(_subtitle) => (errorColor = _subtitle)}>{error.header}</h2>
        </header>
        <section>
          {error.content}
          <span>{error.guidance}</span>
        </section>
        <footer className={classes.modalFooter}>
          <button onClick={closeModal}>خروج</button>
        </footer>
      </Modal>
      <form
        className={classes["profileEdit__form"]}
        onSubmit={submitFormHandler}
      >
        <h2>ویرایش اطلاعات</h2>
        <div>
          <label
            htmlFor="userId"
            className={`${isClicked ? classes.active : ""}`}
          >
            نام کاربری
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            onFocus={() => setIsClicked(true)}
            onBlur={() => setIsClicked(false)}
          />
        </div>
        <div className={classes.avatar} onDrop={dropElementHandler}>
          {!imageUpload && (
            <label htmlFor="avatar">
              <AiOutlineCloudUpload />
            </label>
          )}
          {imageUpload && (
            <img src={imageUrl} alt="" className={classes.avatarPic} />
          )}
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={uploadImageHandler}
          />
        </div>
        <div className={classes.btnContainer}>
          <button type="submit" className={classes["profileEdit__button"]}>
            ارسال
          </button>
          <button
            type="button"
            className={`${classes["profileEdit__button"]} ${classes.save} ${
              !isSending ? classes.off : ""
            }`}
            onClick={saveChangesHandler}
          >
            ذخیره
            <span>
              <AiOutlineCloudUpload />
            </span>
          </button>
        </div>
        {loadingSpinner && ReactDOM.createPortal(<LoadingSpinner />, document.getElementById('portal'))}     
      </form>
    </>
  );
};

export default Profile;
