package httpclient

import (
	"fmt"
	"net/http"
	"io"
)

func NewTailscaleHTTPClient() *tailscaleHttpClient {
	return &TailscaleHttpClient{}
}

func (s *tailscaleHttpClient) GetDevices() string {

	url := "https://api.tailscale.com/api/v2/tailnet/{tailnet}/devices"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer "" ")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	return string(body)
}