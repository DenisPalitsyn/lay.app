import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NoPhoto(props) {
    return (
        <Svg
            width={244}
            height={301}
            viewBox="0 0 244 301"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M231.068 157.125c-1.911 15.29-3.686 30.442-5.46 45.458-1.775 14.061-4.369 27.849-9.965 40.954-1.366 3.139-2.867 6.279-4.915 8.873-5.46 6.962-12.832 7.645-19.794 2.184-4.505-3.549-6.962-8.327-8.737-13.515-2.593-7.235-5.051-14.606-7.781-22.114-8.463 11.603-7.917 27.848-1.774 35.083 3.412 3.959 7.098 7.645 10.647 11.467 6.007 6.416 12.286 12.695 18.02 19.384 2.457 2.867 4.095 6.553 5.87 9.966 1.228 2.32.682 4.641-1.911 5.733-2.184.956-3.959 0-5.051-2.047-6.689-12.15-16.381-21.569-26.62-30.715-12.149-10.785-16.381-24.299-11.876-40.135 1.501-5.46.273-9.282-2.73-13.787-4.505-6.689-8.055-14.197-12.013-21.296-1.092-1.911-1.912-4.095-3.14-6.825-2.457 1.365-4.778 2.32-6.689 3.685-7.235 4.778-13.788 10.375-19.385 17.064-5.187 6.28-6.962 6.007-11.603-.819-3.276-4.914-6.69-9.692-10.238-14.47-1.639-2.184-3.686-3.959-5.46-5.87-10.376 9.146-13.242 24.163-6.553 35.356 3.412 5.87 7.508 11.331 11.057 17.201 9.146 15.152 15.972 31.124 16.791 49.144.136 3.139-.137 6.279-.41 9.555-.273 2.594-1.501 4.369-4.368 3.959-2.457-.273-3.14-2.321-3.276-4.505-.41-5.87-.546-11.74-1.365-17.61-1.502-10.374-1.775-10.101-12.15-11.466-8.736-1.093-17.61-2.048-26.073-4.369-15.972-4.368-29.896-12.559-39.043-26.756-3.276-5.051-5.46-10.921-7.371-16.654-1.775-5.734-4.095-11.058-8.464-15.289-1.638-1.639-3.14-3.277-4.368-5.188-7.099-10.238-6.416-21.296 1.911-30.578.82-.819 1.502-1.638 2.184-2.321.137-.682.273-1.229.137-1.502-4.505-7.781-2.457-15.152 2.593-21.568 7.099-9.146 14.88-17.747 22.388-26.62l15.153-17.61c2.867-3.412 4.232-7.371 4.095-11.876-.273-7.508 2.73-13.651 7.918-18.975 1.774-1.911 3.276-4.368 4.368-6.69 3.822-8.326 7.372-16.654 10.921-24.98C81.453 24.982 88.824 16.11 98.79 9.147c19.112-13.242 43.684-12.15 61.021 3.549 13.924 12.559 22.387 28.667 26.892 46.687 4.915 19.657 9.283 39.315 12.969 59.245 1.365 7.372 4.641 12.286 11.467 14.471 7.235 2.457 14.743 4.231 22.251 6.279 1.365.41 2.73.137 4.095.546 3.413.956 5.87 4.232 6.007 7.508 0 3.549-1.638 6.143-4.915 7.508-2.593.683-5.051 1.365-7.508 2.184zm-40.407-42.181c-.136-1.093-.273-2.185-.546-3.277-3.276-14.88-6.553-29.759-9.965-44.502-.819-3.823-1.775-7.508-3.14-11.194-5.051-13.515-11.194-26.347-21.978-36.448-14.061-13.105-34.264-15.153-50.236-4.505-7.781 5.187-14.743 11.33-18.702 20.34-3.55 8.054-7.372 16.108-11.194 24.162 2.867 3.003 3.55 6.007 2.048 9.556-.41.956-.137 2.184-.273 3.413-.82 13.378-4.505 25.937-11.467 37.404-3.413 5.597-6.962 11.194-9.966 17.064-6.552 12.695-7.235 25.937-2.457 39.451.683-.955.956-2.048.956-3.14.682-15.698 6.006-29.622 15.425-42.318 8.191-11.057 11.604-23.89 14.061-37.267 1.775-10.512 4.778-20.75 8.054-30.852 2.184-6.962 6.553-12.695 12.832-17.2 9.556-6.69 21.842-6.962 31.125.136 5.187 3.96 9.282 8.874 11.74 14.743 3.412 8.191 6.416 16.518 9.282 24.846 3.14 9.419 6.007 18.975 8.874 28.667 3.139 10.375 9.146 18.702 16.517 26.346 9.42 9.693 20.75 16.245 34.265 18.156 4.231.546 8.463.956 12.559-.819-.956-.682-2.048-.955-3.004-1.092-27.165-6.143-45.594-22.388-55.969-48.052-5.461-13.65-7.918-27.984-9.829-42.454-.273-2.048-.273-4.096-.136-6.143 0-2.321 1.092-4.096 3.412-4.369 2.867-.41 4.096 1.638 4.505 4.096.273 1.774.41 3.549.683 5.46 1.228 15.835 5.324 30.851 11.194 45.458 2.32 5.46 5.324 10.784 11.33 14.334zM16.746 171.323c-9.282 6.416-10.92 14.333-5.05 22.933.955 1.502 2.184 2.867 3.549 4.096 5.05 4.641 8.054 10.374 9.556 16.927 3.276 14.743 12.149 25.254 24.845 32.626 13.241 7.645 27.984 10.648 43.137 11.057.819 0 1.638-.546 3.276-1.092-2.73-5.187-5.187-9.965-7.918-14.606-4.231-6.962-8.736-13.788-12.832-20.886-4.504-7.918-5.596-16.245-1.774-24.845 2.047-4.642 1.365-9.147-.683-14.334-9.556.273-18.975.136-28.12-2.457-9.557-2.321-19.249-4.232-27.986-9.419zm75.218-85.866c4.368.41 8.19 1.092 12.149 1.229 2.457.136 4.642.41 5.188 3.14.546 2.73-1.229 4.231-3.686 4.914-3.549 1.092-6.962 1.365-10.648.136-4.368-1.365-6.416.41-6.416 5.051 0 1.092.136 2.321.546 3.277 4.641 11.194 11.057 21.159 21.569 27.438 6.006 3.55 13.105 6.416 20.203 4.642 11.058-2.867 20.477-8.6 26.62-18.839 1.502-2.457 1.502-4.368.546-6.962-2.184-6.143-4.095-12.559-6.28-18.838-.546-1.365-1.228-2.73-2.047-4.642-2.321.82-4.095 1.638-6.007 2.048-3.549.683-7.098 1.365-10.784 1.775-2.321.273-4.095-1.092-4.368-3.413-.41-2.32.955-3.822 3.276-4.505 1.365-.41 2.73-.41 3.959-.82 3.822-1.091 7.644-2.456 11.194-3.548-.819-7.372-1.639-8.055-7.508-7.508-2.185.273-4.505.955-6.69 1.501-2.73.683-5.46 1.638-7.098-1.775-1.092-2.457.546-4.504 4.778-6.142 2.184-.82 4.368-1.229 6.552-1.912 1.502-.41 2.867-.819 5.051-1.365-2.73-7.508-6.143-13.787-12.286-18.02-6.962-4.777-14.606-4.231-21.568.547-8.328 5.597-10.239 14.47-12.969 23.616 3.276 1.092 6.143 1.775 8.6 3.14 1.229.683 2.457 2.73 2.457 4.232 0 2.32-2.047 3.413-4.368 3.276-1.775-.136-3.55-.682-5.324-1.092-2.73-.682-4.505.546-4.914 3.276.136 1.502.273 3.14.273 6.143zm104.567 77.129c3.413 4.914 6.689 9.419 9.829 14.06 2.593 3.823 4.914 7.918 3.276 12.696a1438.758 1438.758 0 01-11.876 34.128c-.956 2.457-2.594 4.641-5.597 3.549-3.004-1.092-2.867-3.686-1.911-6.28 1.501-4.231 3.276-8.463 4.504-12.832.546-2.184.819-4.914.137-7.098-3.959-11.331-8.191-22.661-12.423-33.855a30.315 30.315 0 00-3.958-7.098c-3.004-3.959-5.188-4.369-9.283-1.639-6.962 4.642-12.696 10.375-16.108 18.02-.956 2.184-1.366 5.597-.41 7.781 3.276 7.645 7.099 15.153 10.921 22.661.682 1.228 1.911 2.184 3.822 4.368 0-2.867.546-4.505-.136-5.597-1.229-2.32-3.14-4.505-4.778-6.552-1.638-2.184-2.867-4.505-.41-6.689 2.321-2.048 4.915-.956 6.553 1.228 3.14 4.096 6.825 8.191 8.873 12.832 3.959 8.873 7.099 18.156 10.648 27.166 1.638 4.232 3.413 8.464 5.733 12.286 3.686 5.733 8.874 5.597 12.15-.273 1.501-2.73 2.866-5.734 3.686-8.737 2.593-10.375 5.323-20.749 7.098-31.261 2.184-13.378 3.549-27.029 5.051-40.543.273-2.185-.273-4.369-.41-6.69-6.825-1.365-12.968-2.593-19.384-3.822-1.775 2.321-3.413 4.778-5.597 8.191zm-69.757-16.928c-1.229 3.959-2.048 7.645-3.413 11.194-.955 2.321-2.73 4.505-5.733 3.959-3.276-.546-3.413-3.14-3.14-5.87 0-.546-.409-1.228-.956-2.457-4.914-.683-9.965-1.365-15.152-2.048-3.14-.409-5.46.956-6.143 4.096-.956 4.641-1.775 9.282-2.184 14.06-.41 4.232.955 7.781 4.914 10.512 3.003 2.184 5.324 5.597 7.918 8.327 1.092 1.228 2.32 2.32 3.412 3.413 3.14-4.096 5.734-7.782 8.601-11.194 1.638-2.048 3.958-3.413 6.416-1.365 2.593 2.047 1.638 4.368-.137 6.552-.955 1.229-2.184 2.321-3.003 3.686-1.229 2.184-2.321 4.505-3.413 6.689 8.6-6.416 16.654-12.696 25.937-17.064.956-.409 2.048-1.229 2.594-2.048a1245.79 1245.79 0 0011.33-18.429c-11.467.546-10.921-9.419-14.06-16.244-4.915 1.365-9.42 2.73-13.788 4.231zM67.801 73.444c-4.778 3.277-6.416 7.372-6.28 12.013.274 7.918-2.456 14.607-7.78 20.477-9.01 10.102-18.02 20.34-26.893 30.715-3.686 4.232-7.098 8.873-10.238 13.514-2.867 4.369-2.457 8.191.819 11.058 7.508 6.552 16.654 9.419 26.483 10.784-1.092-8.191-1.092-16.108-3.413-23.207-1.774-5.597-2.184-9.556 2.457-13.241.273-.273.137-.819.41-1.229 3.686-7.508 7.235-15.016 11.057-22.524 2.594-5.324 5.734-10.375 8.328-15.562 3.412-6.962 4.914-14.198 5.05-22.798zm15.836 37.814c-4.232 12.422-13.924 20.34-17.61 32.762 9.282-.409 17.61.546 25.527-3.412.956-.41 2.184-.819 3.14-.546 6.143 1.228 12.286 2.73 18.429 3.958 1.092.273 2.321 0 3.549 0 .41-.546.819-1.228 1.092-1.774-16.244-4.232-25.8-15.699-34.127-30.988zm104.976 49.553c1.912-4.095 3.413-7.235 5.188-10.784-12.15-6.962-21.296-16.518-29.077-27.166-4.914 4.642-9.419 8.737-13.788 12.969-.819.819-1.638 2.32-1.638 3.412-.546 7.236 3.14 10.648 10.102 9.01 12.559-3.14 23.07-1.501 29.213 12.559zM83.91 151.528c-3.55.273-6.69.683-9.83.82-3.412.136-6.688 0-10.92 0-.41 5.05-1.092 9.692-1.229 14.333-.136 7.235.683 7.781 7.645 7.918.956 0 1.775-.137 3.003-.273.273-.819.683-1.638.82-2.457.545-2.185 1.774-3.823 4.095-3.686 2.457.136 3.276 2.047 3.549 4.232.136 1.638.546 3.412.819 5.051.137-4.369-.41-8.601-.273-12.696.41-3.959 1.502-8.191 2.32-13.242zm115.897 37.404c2.594-5.187-.409-7.917-3.959-10.511 1.366 3.549 2.731 7.099 3.959 10.511z"
                fill="#000"
                fillOpacity={0.12}
            />
        </Svg>
    )
}

export default NoPhoto;