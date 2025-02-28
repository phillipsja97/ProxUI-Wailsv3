package main

import (
	"context"
	"fmt"
	"os"
	"tailscale.com/client/tailscale/v2"
)

// TailscaleService manages the Tailscale client
type TailscaleService struct {}

func (s *TailscaleService) GetDevices() (devices []tailscale.Device) {
	tailnet, tailErr := os.LookupEnv("TAILNET")
	if tailErr != true {
		fmt.Printf("Tailnet ENV not found")
	}

	tskey, keyErr := os.LookupEnv("TS_KEY")
	if keyErr != true {
		fmt.Printf("Tailnet ENV not found")
	}

	client := &tailscale.Client{
		Tailnet: tailnet,
		APIKey: tskey,
	}

	devices, err := client.Devices().List(context.Background())

	if err != nil {
		fmt.Printf("Failed to get devices %s", err)
	}

	return devices
}