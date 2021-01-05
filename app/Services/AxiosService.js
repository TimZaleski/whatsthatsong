// @ts-ignore
export const api = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  dataType : 'json',
  headers: {
    'Authorization': 'Bearer BQCYKJ1Fhjlcg7C6uWkKTifjg_Kq7ARCWLHMeZxtvKztGh1hx2YVNNavusRoyNDMCIOFHBEeUrlbsqxYvlB1bQZF5BKViswk_5ka0GzAimaV0yvvAeldTauX8h3CjjB3H66qiV6wWGF4LeN4EE-4yMobcIR74vTS7nvulUGpt4Fw',
    'Content-Type': 'application/json'
  }
})