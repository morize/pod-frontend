import { useEffect, useState } from "react";
import useSWR from "swr";
import styled from "styled-components";

import { getPetKinds } from "../../../Api/PetCalls";
import { getSitter, getPetPreferences } from "../../../Api/SitterCalls";
import { StForm, StP, LoadingComponent } from "../../../Utils/HTMLComponents";
import Switch from "../../../Components/Switch/Switch";
import Checkbox from "../../../Components/Checkbox/Checkbox";
import BaseButton from "../../../Components/Button/BaseButton";

const StPetPreferencesContainer = styled.div`
  margin: 3% 0;
`
const StFormSettings = styled(StForm)`
  & button {
    &:last-child {
      margin-top: 12px;
    }
  }
`;

const StOptionsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16%;
  margin: 2% 0;

  & label {
    border-radius: 14px;

    &:hover {
      background: rgba(72, 72, 72, 0.15);
    }
  }

  @media(max-width: 600px){
    grid-template-columns: repeat(2, 1fr);
  }
`;

const replaceArrayInstance = (
  value: string,
  array?: { kind: string; checked: boolean }[]
) => {
  if (array) {
    let object = array.find((o) => o.kind === value);

    if (object) {
      let arrayInstance = [...array];
      let index = object && array.indexOf(object);
      arrayInstance[index] = object && {
        kind: object.kind,
        checked: !object.checked,
      };
      return arrayInstance;
    }
  }

  return array;
};

export interface ISitterPreferences {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    isSitterActive: boolean,
    create?: boolean,
    checkboxOptions?: { kind: string; checked: boolean }[]
  ) => void;
}

const SitterPreferences = ({ onSubmit }: ISitterPreferences) => {
  const [isSitterActive, setIsSitterActive] = useState(false);
  const [kindPreferences, setKindPreferences] =
    useState<{ kind: string; checked: boolean }[] | undefined>();

  const userId =
    localStorage.getItem("userDetails") !== null &&
    JSON.parse(localStorage.getItem("userDetails")!)["uuid"];

  const { data: kindsOfPetData, isValidating: areKindsLoaded } = useSWR(
    "api/pet-kinds",
    getPetKinds,
    {
      revalidateOnFocus: false,
    }
  );
  const { data: kindPreferencesData, isValidating: arePreferencesLoaded } =
    useSWR(`api/sitter-preferences/${userId}`, getPetPreferences, {
      revalidateOnFocus: false,
    });

  const { data: sitterData, isValidating: isSitterDataLoaded } = useSWR(
    `api/sitters/${userId}`,
    getSitter,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (!isSitterDataLoaded && sitterData) {
      sitterData.sitter_status === "active" && setIsSitterActive(true);
    }
  }, [isSitterDataLoaded, sitterData]);

  useEffect(() => { 
    if (!areKindsLoaded && !arePreferencesLoaded && kindsOfPetData) {
      kindPreferencesData
        ? setKindPreferences(
            kindsOfPetData.map((kind) => {
              return {
                kind: kind,
                checked: kindPreferencesData.includes(kind),
              };
            })
          )
        : setKindPreferences(
            kindsOfPetData.map((kind) => {
              return {
                kind: kind,
                checked: false,
              };
            })
          );
    }
  }, [
    areKindsLoaded,
    arePreferencesLoaded,
    kindsOfPetData,
    kindPreferencesData,
  ]);
  
  return !isSitterDataLoaded ? (
    <StFormSettings
      onSubmit={(e) => {
        e.preventDefault();
        isSitterActive
          ? onSubmit(e, isSitterActive, !sitterData, kindPreferences)
          : onSubmit(e, isSitterActive);
      }}
    >
      <Switch
        label="Ben ik een opasser?"
        checked={isSitterActive}
        onChange={() => setIsSitterActive(!isSitterActive)}
      />
      
      {isSitterActive && (
        <StPetPreferencesContainer>
          <StP variant="primary">Dierenvoorkeur voor oppas:</StP>
          <StOptionsContainer>
            {kindPreferences?.map((kind, key) => (
              <Checkbox
                label={kind.kind}
                key={key}
                checked={kind.checked}
                onClick={(kind) =>
                  setKindPreferences(
                    replaceArrayInstance(kind, kindPreferences)
                  )
                }
                value={kind.kind}
              />
            ))}
          </StOptionsContainer>
        </StPetPreferencesContainer>
      )}

      <BaseButton label="Instellingen opslaan" type="submit" />
    </StFormSettings>
  ) : (
    <LoadingComponent />
  );
};

export default SitterPreferences;
