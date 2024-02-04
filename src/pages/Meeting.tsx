import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from "@elastic/eui";

import { getDocs, query } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

import { meetingsRef } from "../utils/firebaseConfig";
import { MeetingType } from "../utils/types";
import { log } from "console";

export default function Meeting() {
  useAuth();
  const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
  const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
  useEffect(() => {
    const getMyMeetings = async () => {
      const firestoreQuery = query(meetingsRef);
      const fetchedMeetings = await getDocs(firestoreQuery);
    
      
      if (fetchedMeetings.docs.length) {
        const myMeetings: Array<MeetingType> = [];
        fetchedMeetings.docs.forEach((doc) => {
          const data = doc.data();
          if (data.meetingType === "anyone-can-join ") {
            myMeetings.push(data as MeetingType) ; 
            
            
            
          } 
          if (data.createdBy== userInfo?.uid) {
            myMeetings.push(data as MeetingType)
            
          }
          const invitedUsers: (string|undefined)[] = data.invitedUsers;
const isUserInvited = invitedUsers?.includes(userInfo?.uid);

if (isUserInvited) {
  myMeetings.push(data as MeetingType);
}
          
/*           if(data.invitedUsers[0]==userInfo?.uid){
            myMeetings.push(data as MeetingType)
          } */
          

          
          
        });
        
       
      

        setMeetings(myMeetings);
      }
    };
     getMyMeetings();
  }, []);

  const meetingColumns = [
    {
      field: "meetingName",
      name: "اسم الاجتماع      ",
    },
    {
      field: "meetingType",
      name: "نوع الاجتماع      ",
    },
    {
      field: "meetingDate",
      name: "تاريخ الاجتماع      ",
    },
    {
      field: "",
      name: "حالة",

      render: (meeting: MeetingType) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format("L")) {
            return (
              <EuiBadge color="success">
                <Link
                  to={`/join/${meeting.meetingId}`}
                  style={{ color: "black" }}
                >
                
انظم  الآن
                </Link>
              </EuiBadge>
            );
          } else if (
            moment(meeting.meetingDate).isBefore(moment().format("L"))
          ) {
            return <EuiBadge color="default">انتهت</EuiBadge>;
          } else if (moment(meeting.meetingDate).isAfter()) {
            return <EuiBadge color="primary">
            مازالت</EuiBadge>;
          }
        } else return <EuiBadge color="danger">
        ألغيت</EuiBadge>;
      },
    },
    {
      field: "meetingId",
      name: "انسخ",
      width: "10%",
      render: (meetingId: string) => {
        return (
          <EuiCopy
            textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
          >
            {(copy: any) => (
              <EuiButtonIcon
                iconType="copy"
                onClick={copy}
                display="base"
                aria-label="meeting-copy"
              />
            )}
          </EuiCopy>
        );
      },
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" style={{ margin: "1rem" }}>
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable items={meetings} columns={meetingColumns} />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}
