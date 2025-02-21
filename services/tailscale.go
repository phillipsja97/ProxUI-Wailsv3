package services

var defaultLocalClient LocalClient

type LocalClient struct {
	// Dial optionally specifies an alternate func that connects to the local
	// machine's tailscaled or equivalent. If nil, a default is used.
	Dial func(ctx context.Context, network, addr string) (net.Conn, error)

	// Transport optionally specifies an alternate [http.RoundTripper]
	// used to execute HTTP requests. If nil, a default [http.Transport] is used,
	// potentially with custom dialing logic from [Dial].
	// It is primarily used for testing.
	Transport http.RoundTripper

	// Socket specifies an alternate path to the local Tailscale socket.
	// If empty, a platform-specific default is used.
	Socket string

	// UseSocketOnly, if true, tries to only connect to tailscaled via the
	// Unix socket and not via fallback mechanisms as done on macOS when
	// connecting to the GUI client variants.
	UseSocketOnly bool

	// OmitAuth, if true, omits sending the local Tailscale daemon any
	// authentication token that might be required by the platform.
	//
	// As of 2024-08-12, only macOS uses an authentication token. OmitAuth is
	// meant for when Dial is set and the LocalAPI is being proxied to a
	// different operating system, such as in integration tests.
	OmitAuth bool
	// contains filtered or unexported fields
}

func (lc *LocalClient) socket() string {
	if lc.Socket != "" {
		return lc.Socket
	}
	return paths.DefaultTailscaledSocket()
}

func (lc *LocalClient) dialer() func(ctx context.Context, network, addr string) (net.Conn, error) {
	if lc.Dial != nil {
		return lc.Dial
	}
	return lc.defaultDialer
}