export default async function getApi(url) {
  try {
    const response = await (await fetch(url)).json();
    return response;
  } catch (error) {
    console.log("error :", error);
  }
}
