import client from "./client";

export const getFeature = () => client.get("/api/feature");
export const postFeature = (body, option: "basic" | "link") => client.post(`/api/feature/${option}`, body);
export const deleteFeature = (id: number) => client.delete(`/api/feature/${id}`);
export const patchFeature = (body) => client.patch(`/api/feature/${body.id}`, body);
