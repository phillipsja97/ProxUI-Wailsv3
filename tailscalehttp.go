package main

import (
	// "context"
	"os"

	"tailscale.com/client/tailscale/v2"
)

type TailscaleService struct {

}

func NewTailscaleService() *TailscaleService {
	return &TailscaleService{}
}

func (s *TailscaleService) CreateNewClient() &tailscale.Client {
	client := &tailscale.Client {
		Tailnet: os.Getenv("TAILSCALE_TAILNET"),
		APIKey:  os.Getenv("TAILSCALE_API_KEY"),
	}

	// if err != nil {
	// 	return nil, err
	// }

	return client
}