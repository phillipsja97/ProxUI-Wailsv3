package main

import (
	// "github.com/wailsapp/wails/v3/pkg/application"
	"context"
	// "fmt"
	// "log"
	"tailscale.com/client/tailscale/v2"
)

// TailscaleService manages the Tailscale client
type TailscaleService struct {
	ctx    context.Context
	client *tailscale.Client
}

// NewTailscaleService initializes the service with a new Tailscale client
func (s *TailscaleService) NewTailscaleService() (*TailscaleService, error) {
	client := &tailscale.Client {
		Tailnet: "",
		APIKey:  "",
	}
	// if err != nil {
	// 	return nil, fmt.Errorf("failed to create Tailscale client: %w", err)
	// }	
	ctx := context.Background()

	return &TailscaleService{
		ctx:    ctx,
		client: client,
	}, nil
}