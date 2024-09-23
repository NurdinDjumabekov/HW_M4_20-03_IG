///// hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ru from "date-fns/locale/ru";

////// components
import ReactDatePicker from "react-datepicker";
import { BottomSheet } from "react-spring-bottom-sheet";

////// style
import "./style.scss";

////// fns
import { setListPointsEveryTA } from "../../../store/reducers/mapSlice";
import { getDateRouteAgent } from "../../../store/reducers/mapSlice";
import { setDateRoute } from "../../../store/reducers/mapSlice";

////// helpers
import { reverseTransformActionDate } from "../../../helpers/transformDate";
import { transformActionDate } from "../../../helpers/transformDate";

const ChoiceDateForMap = ({ openCateg, setOpenCateg }) => {
  const dispatch = useDispatch();

  const { dateRoute } = useSelector((state) => state.mapSlice);
  const { guid } = useSelector((state) => state.saveDataSlice?.dataSave);

  const onChange = (date) => {
    dispatch(setDateRoute(transformActionDate(date))); /// подствляю дату в активгый state
    setOpenCateg(false);
    dispatch(setListPointsEveryTA([]));
    //// очищаю список чтобы его не отображать на карте
    dispatch(getDateRouteAgent({ guid, date }));
  };

  return (
    <div className="choiceDateForMap">
      <BottomSheet
        open={openCateg}
        onDismiss={() => setOpenCateg(false)}
        defaultSnap={({ maxHeight }) => maxHeight * 0.7}
        snapPoints={({ maxHeight }) => maxHeight * 0.7}
      >
        <div className="choiceDateForMap__date">
          <ReactDatePicker
            selected={reverseTransformActionDate(dateRoute)}
            onChange={onChange}
            placeholderText="ДД.ММ.ГГГГ"
            dateFormat="dd.MM.yyyy"
            locale={ru}
            yearDropdownItemNumber={100}
            maxDate={new Date()}
            inline
          />
        </div>
      </BottomSheet>
    </div>
  );
};

export default ChoiceDateForMap;