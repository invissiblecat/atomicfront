import NewOrderForm from "app/components/deploy/deploy.form";
import FirstBoxSend from "app/components/first-box";
import Header from "app/components/header";
import MainTable from "app/components/main.table";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { animateScroll } from "react-scroll";
import "./main.page.sass";

function MainPage() {
  // useEffect(() => {
  //   animateScroll.scrollTo(170, {
  //     duration: 300,
  //   });
  // }, []);

  return (
    <>
      <div className="page">
        <div className="page__inner">
          <h1 className="page__title">Atomic Swap</h1>
          <div className="page__desc" id="about">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            faucibus porta libero, at porttitor elit congue eget. Nullam dictum,
            risus quis aliquet dictum, augue lacus lacinia augue, eget mattis
            elit diam id nulla. Vivamus pulvinar sapien a mauris vestibulum
            euismod. Curabitur vehicula ante gravida placerat rutrum.
            Suspendisse potenti. Maecenas quis accumsan lectus. In id odio
            congue, auctor enim in, ultricies lacus. Suspendisse potenti. Sed
            risus arcu, vehicula at nibh id, faucibus condimentum ex. Nullam at
            lobortis nisi. Integer lobortis tellus nec congue bibendum.
          </div>
        </div>
        <div className="page__line"> </div>
      </div>
      <MainTable />
      <div className="page__form" id="form">
        <NewOrderForm></NewOrderForm>
      </div>
      <FirstBoxSend boxId={""} statusToUpdate={""} redirect={""} />
    </>
  );
}

export default MainPage;
