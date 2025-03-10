package main

import (
	"embed"
	_ "embed"
	"log"
	"log/slog"
	"time"
	"os"
	"runtime"

	// "github.com/pocketbase/pocketbase"
	"github.com/wailsapp/wails/v3/pkg/application"
	// "github.com/pocketbase/pocketbase/cmd"
	// "github.com/pocketbase/pocketbase/apis"
	// "github.com/pocketbase/pocketbase/cmd"
	// "github.com/pocketbase/pocketbase/core"
	// "github.com/pocketbase/pocketbase/plugins/ghupdate"
	// "github.com/pocketbase/pocketbase/plugins/jsvm"
	// "github.com/pocketbase/pocketbase/plugins/migratecmd"
	// "github.com/pocketbase/pocketbase/tools/hook"
	// "github.com/wailsapp/wails/v3/pkg/services/sqlite"
)

// Wails uses Go's `embed` package to embed the frontend files into the binary.
// Any files in the frontend/dist folder will be embedded into the binary and
// made available to the frontend.
// See https://pkg.go.dev/embed for more information.

//go:embed all:frontend/dist
var assets embed.FS
// main function serves as the application's entry point. It initializes the application, creates a window,
// and starts a goroutine that emits a time-based event every second. It subsequently runs the application and
// logs any error that might occur.

func main() {

	// Create a new Wails application by providing the necessary options.
	// Variables 'Name' and 'Description' are for application metadata.
	// 'Assets' configures the asset server with the 'FS' variable pointing to the frontend files.
	// 'Bind' is a list of Go struct instances. The frontend has access to the methods of these instances.
	// 'Mac' options tailor the application when running an macOS.

	// go StartPocketBase()
	// ctx := context.Background()
	// pbs := PocketBaseInit()

	// sqliteConfig := sqlite.Config{
	// 	DBFile: "tail.db",
	// }
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	app := application.New(application.Options{
		Name:        "ProxUI-v3",
		Description: "Test Application for Tailscale and Traefik/Caddy",
		Services: []application.Service{
			// application.NewService(sqlite.New(&sqliteConfig)),
			application.NewService(&TailscaleClient{}),
		},
		Assets: application.AssetOptions{
			Handler: application.AssetFileServerFS(assets),
		},
		Mac: application.MacOptions{
			ApplicationShouldTerminateAfterLastWindowClosed: true,
		},
		Logger: logger,
		LogLevel: -4,
	})

	menu := app.NewMenu()

    // Add platform-specific application menu
    if runtime.GOOS == "linux" {
        menu.AddRole(application.AppMenu)
    }

	menu.AddRole(application.FileMenu)
    menu.AddRole(application.EditMenu)
	menu.AddSubmenu("Settings").Add("Testing").OnClick(
		func(ctx *application.Context) {
			window := app.CurrentWindow()
			window.ToggleFullscreen()
		},
	)
    menu.AddRole(application.WindowMenu)
    menu.AddRole(application.HelpMenu)

	app.SetMenu(menu)

	iconBytes, _ := assets.ReadFile("assets/tailscaleLogo.png")
	// systray := app.NewSystemTray()
	// systray.SetLabel("Tailscale GUI")
	// systray.SetIcon(iconBytes)
	// systray.Run()

	// Create a new window with the necessary options.
	// 'Title' is the title of the window.
	// 'Mac' options tailor the window when running on macOS.
	// 'BackgroundColour' is the background colour of the window.
	// 'URL' is the URL that will be loaded into the webview.

	app.NewWebviewWindowWithOptions(application.WebviewWindowOptions{
		Title: "Tailscale GUI",
		Frameless: false,
		// BackgroundColour: application.NewRGB(160, 160, 140),
		Mac: application.MacWindow{
			InvisibleTitleBarHeight: 50,
			Backdrop:                application.MacBackdropTranslucent,
			TitleBar:                application.MacTitleBarHiddenInset,
		},
		Linux: application.LinuxWindow{
			Icon: iconBytes,
		},
		URL:              "/",
		})

	// Create a goroutine that emits an event containing the current time every second.
	// The frontend can listen to this event and update the UI accordingly.

	go func() {
		for {
			now := time.Now().Format(time.RFC1123)
			app.EmitEvent("time", now)
			time.Sleep(time.Second)
		}
	}()
	

	// Run the application. This blocks until the application has been exited.

	err := app.Run()

	// If an error occurred while running the application, log it and exit.

	if err != nil {
		log.Fatal(err)
	}
}
