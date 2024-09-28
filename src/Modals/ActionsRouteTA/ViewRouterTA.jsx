////hooks
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/////// style
import "./style.scss";

////// imgs

////// components
import Modals from "../../components/Modals/Modals";

/////// fns
import { setActiveActions_TA } from "../../store/reducers/mapSlice";

/////// helpers
import { listActions_TA, logoSeller } from "../../helpers/LocalData";

const ActionsRouteTA = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeActions_TA } = useSelector((state) => state.mapSlice);

  const closeModal = () => {
    dispatch(setActiveActions_TA({ guid: "", actionType: 0 }));
    /// очишаю для закрытия модалки
  };

  const clickCateg = ({ link }) => {
    const linkNext = `/${activeActions_TA?.guid}/${activeActions_TA?.point_guid}`;
    navigate(`${link}${linkNext}`);
  };

  return (
    <div className="actionsRouteTA">
      <Modals
        openModal={!!activeActions_TA?.guid}
        closeModal={closeModal}
        title={`Торговая точка : '${activeActions_TA?.point}'`}
      >
        <>
          <div className="titlesInfo">
            <div className="header">
              <div className="logo">
                <img
                  src={activeActions_TA?.seller_photo || logoSeller}
                  alt=""
                />
              </div>
              <div className="user">
                <span>{activeActions_TA?.seller_fio}</span>
                <span> +996{activeActions_TA?.seller_number}</span>
              </div>
            </div>
            <p>Время прихода: {activeActions_TA?.start_time}</p>
            <p>Время выхода: {activeActions_TA?.end_time}</p>
          </div>
          <div className="listActions">
            {listActions_TA?.map((item) => (
              <div
                style={{ background: item?.color }}
                onClick={() => clickCateg(item)}
              >
                {item?.icon}
                <p>{item?.name}</p>
              </div>
            ))}
          </div>
        </>
      </Modals>
    </div>
  );
};

export default ActionsRouteTA;
