import { useState } from "react";
import useSWR from "swr";
import styled from "styled-components";

import { createSitterRequest } from "../../../Api/SitterRequestCalls";
import { getSitter } from "../../../Api/SitterCalls";
import { StH3, StLabel, StP, StForm } from "../../../Utils/HTMLComponents";
import { StProfileDetailsSitter } from "./PetInfo";
import TextArea from "../../../Components/Input/TextArea";
import BaseButton from "../../../Components/Button/BaseButton";

const StModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: translate(-50%, -50%);
  height: 720px;
  width: 600px;
  padding: 40px 60px;
  background: #be8b4e;
  border-radius: 8px;
  box-sizing: border-box;

  & h3 {
    color: #ffff;
  }
`;

const SitterModalInfo = styled(StProfileDetailsSitter)`
  display: flex;
  min-height: 200px;
  height: auto;
  max-height: 300px;
  margin-bottom: 24px;
  border-radius: 8px;
  overflow: auto;
`;

interface IPetProfileModal {
  pet_id: string;
  user_id?: number;
  sit_hourly_prize?: number;
  sit_date_start?: string;
  sit_date_end?: string;
  pet_owner?: string;
}

const SitterModal = ({
  sit_date_start,
  sit_date_end,
  sit_hourly_prize,
  pet_owner,
  pet_id,
  user_id,
}: IPetProfileModal) => {
  const [sitterRemarks, setSitterRemarks] = useState("");

  const { data: sitterData, isValidating: isSitterDataLoaded } = useSWR(
    `api/sitters/${user_id}`,
    getSitter,
    { revalidateOnFocus: false }
  );

  const submitFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sitterData && !isSitterDataLoaded) {
      let fData = new FormData();
      fData.append("sitter_id", sitterData.id);
      fData.append("pet_id", pet_id);
      sitterRemarks && fData.append("sitter_remarks", sitterRemarks);

      createSitterRequest(fData).then(() => console.log("success"));
    }
  };

  return (
    <StModal>
      <StH3>Reageer voor oppas</StH3>
      <StLabel style={{ color: "#ffff", marginBottom: "12px" }}>
        Oppas informatie:
      </StLabel>
      <SitterModalInfo>
        {sit_date_start && (
          <div>
            <StLabel>Datum start:</StLabel>
            <StP>{sit_date_start}</StP>
          </div>
        )}

        {sit_date_end && (
          <div>
            <StLabel>Datum eind:</StLabel>
            <StP>{sit_date_end}</StP>
          </div>
        )}

        {sit_hourly_prize && (
          <div>
            <StLabel>Uurtarief:</StLabel>
            <StP>{sit_hourly_prize.toString()} €</StP>
          </div>
        )}

        {pet_owner && (
          <div>
            <StLabel>Huisdier eigenaar:</StLabel>
            <StP>{pet_owner}</StP>
          </div>
        )}
      </SitterModalInfo>

      <StForm onSubmit={submitFormData}>
        <StLabel style={{ color: "#ffff", marginBottom: "12px" }}>
          Uw opmerkingen:
        </StLabel>
        <TextArea
          value={sitterRemarks}
          onChange={(e) => setSitterRemarks(e.target.value)}
        />

        <BaseButton label="Stuur verzoek" type="submit" />
      </StForm>
    </StModal>
  );
};

export default SitterModal;
