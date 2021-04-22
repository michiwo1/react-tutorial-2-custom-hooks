import axios from "axios";
import { useState } from "react";
import { UserProlife } from "../types/userProfile";
import { User } from "../types/api/user";

// 全ユーザー一覧を取得するカスタムフック
export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProlife>>([]);
  const [loading, setLoaing] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setLoaing(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaing(false);
      });
  };

  return { getUsers, userProfiles, loading, error };
};
