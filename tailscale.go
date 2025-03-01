package main

import (
	"context"
	"fmt"
	"os"
	"log"
	// "encoding/json"
	"github.com/joho/godotenv"
	"tailscale.com/client/tailscale/v2"
)

// TailscaleService manages the Tailscale client
type TailscaleService struct {}

func (s *TailscaleService) GetDevices() (devices []tailscale.Device) {
	loadErr := godotenv.Load()
	if loadErr != nil {
		log.Fatalf("Error loading .env file %s", loadErr)
	}

	client := &tailscale.Client{
		Tailnet: os.Getenv("TAILNET"),
		APIKey: os.Getenv("TAILSCALE_APIKEY"),
	}

	devices, err := client.Devices().ListWithAllFields(context.Background())
	if err != nil {
		fmt.Printf("Failed to get devices %s", err)
	}

	return devices
}

func (s *TailscaleService) GetUsers() (users []tailscale.User) {
	loadErr := godotenv.Load()
	if loadErr != nil {
		log.Fatalf("Error loading .env file %s", loadErr)
	}

	client := &tailscale.Client{
		Tailnet: os.Getenv("TAILNET"),
		APIKey: os.Getenv("TAILSCALE_APIKEY"),
	}

	// var userType *tailscale.UserType
	// var userRole *tailscale.UserRole


	users, err := client.Users().List(context.Background(), nil, nil)
	if err != nil {
		fmt.Printf("Failed to get users %s", err)
	}

	return users
}