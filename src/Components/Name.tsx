

interface NameProps {
  profilePic?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  description?: string;
}

export default function Name({ profilePic, firstName, lastName, email, description }: NameProps) {
  const showAvatar = profilePic !== undefined && profilePic !== null && profilePic !== '';

  return (
    <div className={`flex items-start ${showAvatar ? 'gap-3' : ''}`}>
      {showAvatar && (
        <img
          src={profilePic || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=f3f4f6&color=374151`}
          className="w-11 h-11 rounded-full bg-gray-100 object-cover border border-gray-100 shadow-sm shrink-0"
          alt="avatar"
        />
      )}
      <div className="min-w-0 flex-1 flex flex-col justify-center">
        <p className="text-[15px] font-medium text-gray-900 leading-tight truncate">
          {`${firstName || ''} ${lastName || ''}`.trim() || 'Unknown'}
        </p>
        {email && (
          <p className="text-[13px] text-gray-600 mt-1 break-words">
            {email}
          </p>
        )}
        {description && (
          <p
            className="text-[13px] text-gray-500 mt-1 overflow-hidden text-ellipsis break-words"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            title={description}
          >
            {description.replace(/<[^>]*>/g, "")}
          </p>
        )}
      </div>
    </div>
  );
}