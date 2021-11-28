import { WholeJSONType } from "@site/src/types/wholeJson";
import client from "./client";

export const getFeatureAPI = () => client.get("/api/feature");
export const postFeature = (body, option: "basic" | "link") =>
  client.post(`/api/feature/${option}`, body);
export const deleteFeature = (id: number) =>
  client.delete(`/api/feature/${id}`);
export const patchFeature = (id: number, body: string) =>
  client.patch(`/api/feature/${id}`, body);
export const resetSettingsAPI = (body: WholeJSONType) =>
  client.post("/api/reset", body);
