"use server"


import { baseurl } from "@/utils";
import Calls from "./axios";
import { getrefreshtoken } from "./refreshToken";

const $Http = Calls(`${baseurl}/user`);

const getme = async () => {
    const { refreshToken } = await getrefreshtoken();

    const config = {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            accept: "application/json",
            Authorization: `Bearer ${refreshToken}`,
        },
    };
    try {
        const res = await $Http.get("/get-me", config);
        return {
            status: res.status,
            message: res.data.message,
            user: res.data.user,
        };

    } catch (e: any) {
        return {
            message: e?.response?.data.message,
            status: e?.response?.status,
        };
    }
};

export { getme };