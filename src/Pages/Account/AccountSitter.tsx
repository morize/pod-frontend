import styled from "styled-components";
import useSWR, { trigger } from "swr";

import { laravelApiUrl } from "../../Api/Api";
import {
  createSitter,
  createPetPreferences,
  updateSitterStatus,
  updatePetPreferences,
  getSitterRequests,
} from "../../Api/SitterCalls";
import {
  LoadingComponent,
  StH2,
  StH3,
  StSection,
} from "../../Utils/HTMLComponents";
import { translateStatus } from "../../Api/PetCalls";
import SitterPreferences from "./AccountSitter/SitterPreferences";
import PetCard, { SitterCardItem } from "../../Components/Card/PetCard/PetCard";

const StOptionsSection = styled(StSection)`
  display: flex;
  flex-direction: column;
`;

const AccountSitter = () => {
  const userId =
    localStorage.getItem("userDetails") !== null &&
    JSON.parse(localStorage.getItem("userDetails")!)["uuid"];

  const {
    data: sitterRequestsData,
    isValidating: isSitterRequestsDataValidating,
  } = useSWR(`api/sitters/${userId}/requests`, getSitterRequests, {
    revalidateOnFocus: false,
  });

  const onPetPreferencesSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    isSitterActive: boolean,
    create?: boolean,
    checkboxOptions?: { kind: string; checked: boolean }[]
  ) => {
    e.preventDefault();

    let sitterStatusData = new FormData();
    sitterStatusData.append(
      "sitter_status",
      isSitterActive ? "active" : "inactive"
    );

    create
      ? createSitter(sitterStatusData)
      : updateSitterStatus(sitterStatusData, userId).then(() => {
          if (checkboxOptions) {
            let petPreferencesFormData = new FormData();
            petPreferencesFormData.append(
              "sitter_preferences",
              JSON.stringify(checkboxOptions)
            );
            create
              ? createPetPreferences(petPreferencesFormData)
              : updatePetPreferences(petPreferencesFormData, userId);
          }
        });

    trigger(`api/sitters/${userId}`);
  };

  return (
    <>
      <StH2>Opasser</StH2>
      <StSection>
        <StH3>Mijn oppasvragen</StH3>

        <PetCard cardVariant="sitter">
          {!isSitterRequestsDataValidating ? (
            sitterRequestsData &&
            sitterRequestsData.length !== 0 &&
            sitterRequestsData.map((request, key) => (
              <SitterCardItem
                petName={request.pet_name}
                owner={request.owner_name}
                status={translateStatus(request.request_status)}
                petImageUrl={`${laravelApiUrl}/api/pets/${request.pet_id}/image`}
                redirectTo={request.pet_id}
                key={key}
              />
            ))
          ) : (
            <LoadingComponent />
          )}
        </PetCard>
      </StSection>

      <StOptionsSection>
        <StH3>Oppas instellingen</StH3>

        <SitterPreferences onSubmit={onPetPreferencesSubmit} />
      </StOptionsSection>
    </>
  );
};

export default AccountSitter;
