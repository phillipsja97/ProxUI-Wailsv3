package pocketbase

import (
    "log"
    "os"

    "github.com/pocketbase/pocketbase"
    "github.com/pocketbase/pocketbase/apis"
    "github.com/pocketbase/pocketbase/core"
	"github.com/spf13/cobra"
)

type Pocketbase struct {}

func (p *Pocketbase) PocketbaseInit() (*Pocketbase) {
	return &Pocketbase{}
}

func (p * Pocketbase) PocketbaseSetup() {
    app := pocketbase.New()

    app.OnServe().BindFunc(func(se *core.ServeEvent) error {
        // serves static files from the provided public dir (if exists)
        se.Router.GET("/{path...}", apis.Static(os.DirFS("./pb_public"), false))

        return se.Next()
    })

    if err := app.Start(); err != nil {
        log.Fatal(err)
    }

	app.OnRecordCreateRequest("posts").BindFunc(func(e *core.RecordRequestEvent) error {
		// if not superuser, overwrite the newly submitted "posts" record status to pending
		if !e.HasSuperuserAuth() {
			e.Record.Set("status", "pending")
		}
	
		return e.Next()
	})

	app.RootCmd.AddCommand(&cobra.Command{
		Use: "hello",
		Run: func(cmd *cobra.Command, args []string) {
			print("Hello world!")
		},
	})
}