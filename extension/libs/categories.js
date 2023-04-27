// eslint-disable-next-line no-redeclare
const Categories = {}

    ; (() => {

        const Delete = value => {

            const categoryName = 'testing'
            Notification.DeleteCategory(categoryName).then(yes => {

                if (yes) {
                    //TODO delete
                }

            })

        }

        Categories.Delete = Delete

    })()
