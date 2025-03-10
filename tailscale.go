//

package main

import (
	"context"
	"fmt"
	"log/slog"

	"tailscale.com/client/tailscale"
	"tailscale.com/types/key"

	// "tailscale.com/client/tailscale/apitype"
	// "tailscale.com/cmd/tailscale/cli"
	// "tailscale.com/ipn"
	"tailscale.com/ipn/ipnstate"
	// "tailscale.com/net/netcheck"
	// "tailscale.com/net/netmon"
	// "tailscale.com/tailcfg"
	// "tailscale.com/types/logger"
)

type TailscaleClient struct {}

var (
	localClient tailscale.LocalClient
)

func (*TailscaleClient) StartService( logger *slog.Logger) *TailscaleClient {
	return &TailscaleClient{}
}

func (*TailscaleClient) TailscaleStatus(ctx context.Context) (*ipnstate.Status, error) {
	status, err := localClient.Status(ctx)
	if err != nil {
		return nil, fmt.Errorf("error connecting to tailscale status %w", err)
	}

	return status, nil
}

func (*TailscaleClient) GetTailscalePeers(ctx context.Context) ([]*ipnstate.PeerStatus, error) {
	status, err := localClient.Status(ctx)
	if err != nil {
		return nil, fmt.Errorf("error connecting to tailscale status %w", err)
	}

	return extractPeerStatus(status.Peer), nil
}

func extractPeerStatus(peerMap map[key.NodePublic]*ipnstate.PeerStatus) []*ipnstate.PeerStatus {
    var result []*ipnstate.PeerStatus
    for _, peerStatus := range peerMap {
        result = append(result, peerStatus)
    }
    return result
}