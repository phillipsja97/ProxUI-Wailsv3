package main

import (
	// "github.com/wailsapp/wails/v3/pkg/application"
	// "context"
	"fmt"
	"io"
	"log"
	// "tailscale.com/client/tailscale/v2"
	"net/http"
	"net/url"
	"time"
)

// var (
// 	baseUrl = "https://api.tailscale.com/api/v2/"
// )

// TailscaleService manages the Tailscale client
type TailscaleService struct {
	// ctx    context.Context
	baseURL *url.URL
	apiKey string
	tailnetConnect string
	tailnetHttp *Tailnet
}

type Tailnet struct {
	HTTP *http.Client
}

var defaultBaseURL *url.URL
// NewTailscaleService initializes the service with a new Tailscale client
func (s *TailscaleService) NewTailscaleService() (*TailscaleService, error) {
	
	tailClient := &Tailnet {
		HTTP: &http.Client {
			Timeout: time.Minute,
		},
	}
	// const defaultContentType = "application/json"
	var baseUrlErr error
	defaultBaseURL, baseUrlErr := url.Parse("https://api.tailscale.com")
	const defaultHttpClientTimeout = time.Minute

	if baseUrlErr != nil {
		panic(fmt.Errorf("failed to parse defaultBaseURL: %w", baseUrlErr))
	}

	return &TailscaleService{
		baseURL: defaultBaseURL,
		apiKey: "",
		tailnetConnect: "",
	 	tailnetHttp: tailClient,
	}, nil
}

func (s *TailscaleService) GetDevices() (res *http.Response, respErr error) {
	// url := "https://api.tailscale.com/api/v2/tailnet/example.com/devices"
	var version_segment string = "/api/v2/tailnet"
	var route string = "devices"
	// request_url := url.PathJoin(s.baseURL, version_segment, s.tailnetConnect)
	devicesURL, err := url.JoinPath(s.baseURL.Path, version_segment, route)
	if err != nil { log.Fatal(err) }


	req, _ := http.NewRequest("GET", devicesURL, nil)
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", s.apiKey))
	res, respErr = s.tailnetHttp.HTTP.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(string(body))

	if respErr != nil { log.Fatal(respErr)}

	return res, nil
}