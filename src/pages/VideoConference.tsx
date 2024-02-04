import {
  EuiFlexGroup,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
} from "@elastic/eui";
import { addDoc } from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
import MeetingDateField from "../components/FormComponents/MeetingDateField";
import MeetingMaximumUsersField from "../components/FormComponents/MeetingMaximumUsersField";
import MeetingNameField from "../components/FormComponents/MeetingNameFIeld";
import MeetingUserField from "../components/FormComponents/MeetingUserField";

import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useFetchUsers from "../hooks/useFetchUsers";
import useToast from "../hooks/useToast";
import { meetingsRef } from "../utils/firebaseConfig";
import { generateMeetingID } from "../utils/generateMeetingId";
import { FieldErrorType, UserType } from "../utils/types";

export default function VideoConference() {
  useAuth();
  const [users] = useFetchUsers();
  const [createToast] = useToast();
  const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
  const navigate = useNavigate();

  const [meetingName, setMeetingName] = useState("");
  const [selectedUser, setSelectedUser] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment());
  const [size, setSize] = useState(1);
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUsers: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUsers: {
      show: false,
      message: [],
    },
  });
  const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);

  const onUserChange = (selectedOptions: Array<UserType>) => {
    setSelectedUser(selectedOptions);
  };

  const validateForm = () => {
    const showErrorsClone = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["  الرجاء إدخال اسم الاجتماع"];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUser.length && !anyoneCanJoin) {
      showErrorsClone.meetingUsers.show = true;
      showErrorsClone.meetingUsers.message = ["الرجاء تحديد مستخدم      "];
      errors = true;
    } else {
      showErrorsClone.meetingUsers.show = false;
      showErrorsClone.meetingUsers.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  };

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingsRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: anyoneCanJoin ? "  anyone-can-join " : "video conference",
        invitedUsers: anyoneCanJoin
          ? []
          : selectedUser.map((user: UserType) => user.uid),
        meetingDate: startDate.format("L"),
        maxUsers: anyoneCanJoin ? 100 : size,
        status: true,
      });
      createToast({
        title: anyoneCanJoin
          ? "يمكن لأي شخص الانضمام إلى الاجتماع الذي تم إنشاؤه بنجاح"
          : "يمكن لأي شخص الانضمام إلى الاجتماع الذي تم إنشاؤه بنجاح",
        type: "success",
      });
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <EuiFormRow display="columnCompressedSwitch" label="يمكن لأي شخص الانضمام">
            <EuiSwitch
              showLabel={false}
              label="يمكن لأي شخص الانضمام"
              checked={anyoneCanJoin}
              onChange={(e) => setAnyoneCanJoin(e.target.checked)}
              compressed
            />
          </EuiFormRow>

          <MeetingNameField
            label="اسم الاجتماع"
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            placeholder=" اسم الاجتماع"
            value={meetingName}
            setMeetingName={setMeetingName}
          />

          {anyoneCanJoin ? (
            <MeetingMaximumUsersField value={size} setSize={setSize} />
          ) : (
            <MeetingUserField
              label="دعوة المستخدمين              "
              isInvalid={showErrors.meetingUsers.show}
              error={showErrors.meetingUsers.message}
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUser}
              isClearable={false}
              placeholder="  حدد مستخدمًا              "
            />
          )}
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}
